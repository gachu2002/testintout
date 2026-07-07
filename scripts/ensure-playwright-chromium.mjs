#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

import { chromium } from '@playwright/test';

const defaultExtractRoot = '/tmp/opencode/chrome-libs';
const libraryPath =
  process.env.PLAYWRIGHT_CHROMIUM_LIBRARY_PATH ??
  path.join(defaultExtractRoot, 'usr/lib/x86_64-linux-gnu');
const extractRoot =
  process.env.PLAYWRIGHT_CHROMIUM_LIBRARY_EXTRACT_ROOT ?? path.resolve(libraryPath, '../../..');
const downloadDirectory =
  process.env.PLAYWRIGHT_CHROMIUM_DEB_CACHE ?? '/tmp/opencode/playwright-debs';

const packageAlternativesByLibrary = new Map([
  ['libasound.so.2', ['libasound2', 'libasound2t64']],
  ['libnspr4.so', ['libnspr4']],
  ['libplc4.so', ['libnspr4']],
  ['libplds4.so', ['libnspr4']],
  ['libnss3.so', ['libnss3']],
  ['libnssutil3.so', ['libnss3']],
  ['libsmime3.so', ['libnss3']],
  ['libatk-1.0.so.0', ['libatk1.0-0']],
  ['libatk-bridge-2.0.so.0', ['libatk-bridge2.0-0']],
  ['libcups.so.2', ['libcups2']],
  ['libdbus-1.so.3', ['libdbus-1-3']],
  ['libdrm.so.2', ['libdrm2']],
  ['libgbm.so.1', ['libgbm1']],
  ['libgio-2.0.so.0', ['libglib2.0-0']],
  ['libglib-2.0.so.0', ['libglib2.0-0']],
  ['libgobject-2.0.so.0', ['libglib2.0-0']],
  ['libgtk-3.so.0', ['libgtk-3-0']],
  ['libpango-1.0.so.0', ['libpango-1.0-0']],
  ['libpangocairo-1.0.so.0', ['libpango-1.0-0']],
  ['libxkbcommon.so.0', ['libxkbcommon0']],
  ['libX11.so.6', ['libx11-6']],
  ['libXcomposite.so.1', ['libxcomposite1']],
  ['libXdamage.so.1', ['libxdamage1']],
  ['libXext.so.6', ['libxext6']],
  ['libXfixes.so.3', ['libxfixes3']],
  ['libXrandr.so.2', ['libxrandr2']],
  ['libXrender.so.1', ['libxrender1']],
]);

const executablePath = ensureChromiumInstalled();
const firstMissingLibraries = getMissingLibraries(executablePath);

if (firstMissingLibraries.length === 0) {
  process.exit(0);
}

const packageGroups = resolvePackageGroups(firstMissingLibraries);

console.log(
  `[playwright] Chromium is missing shared libraries: ${firstMissingLibraries.join(', ')}`,
);
console.log(`[playwright] Downloading local libraries into ${extractRoot}`);

mkdirSync(downloadDirectory, { recursive: true });
mkdirSync(extractRoot, { recursive: true });

for (const alternatives of packageGroups) {
  downloadPackage(alternatives);
}

for (const debFile of readdirSync(downloadDirectory).filter((file) => file.endsWith('.deb'))) {
  runRequired('dpkg-deb', ['-x', path.join(downloadDirectory, debFile), extractRoot], {
    errorMessage: `Failed to extract ${debFile}`,
  });
}

const remainingMissingLibraries = getMissingLibraries(executablePath);

if (remainingMissingLibraries.length > 0) {
  fail(
    `Chromium still has unresolved libraries: ${remainingMissingLibraries.join(', ')}\n` +
      'Install Playwright dependencies with `pnpm exec playwright install-deps chromium`, ' +
      'or add the missing libraries to PLAYWRIGHT_CHROMIUM_LIBRARY_PATH.',
  );
}

console.log(`[playwright] Chromium dependencies resolved via ${libraryPath}`);

function ensureChromiumInstalled() {
  const executable = chromium.executablePath();

  if (existsSync(executable)) {
    return executable;
  }

  console.log('[playwright] Installing Chromium browser');
  runRequired('pnpm', ['exec', 'playwright', 'install', 'chromium'], {
    errorMessage: 'Failed to install Playwright Chromium browser',
  });

  if (!existsSync(executable)) {
    fail(`Playwright Chromium executable was not found at ${executable}`);
  }

  return executable;
}

function getMissingLibraries(executable) {
  if (process.platform !== 'linux') {
    return [];
  }

  const result = spawnSync('ldd', [executable], {
    encoding: 'utf8',
    env: {
      ...process.env,
      LD_LIBRARY_PATH: [libraryPath, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':'),
    },
  });

  if (result.error?.code === 'ENOENT') {
    return [];
  }

  if (result.status !== 0) {
    fail(`Failed to inspect Chromium dependencies with ldd.\n${result.stderr}`);
  }

  const output = `${result.stdout}\n${result.stderr}`;
  const missingLibraries = new Set();

  for (const match of output.matchAll(/\s*(\S+) => not found/g)) {
    missingLibraries.add(match[1]);
  }

  return [...missingLibraries];
}

function resolvePackageGroups(missingLibraries) {
  const packageGroupsByKey = new Map();
  const unknownLibraries = [];

  for (const library of missingLibraries) {
    const alternatives = packageAlternativesByLibrary.get(library);

    if (!alternatives) {
      unknownLibraries.push(library);
      continue;
    }

    packageGroupsByKey.set(alternatives.join('|'), alternatives);
  }

  if (unknownLibraries.length > 0) {
    fail(
      `Chromium is missing libraries without package mappings: ${unknownLibraries.join(', ')}\n` +
        'Install Playwright dependencies with `pnpm exec playwright install-deps chromium`, ' +
        'or extend scripts/ensure-playwright-chromium.mjs.',
    );
  }

  return [...packageGroupsByKey.values()];
}

function downloadPackage(alternatives) {
  const errors = [];

  for (const packageName of alternatives) {
    const result = spawnSync('apt-get', ['download', packageName], {
      cwd: downloadDirectory,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (result.status === 0) {
      return;
    }

    errors.push(`${packageName}: ${result.stderr || result.stdout}`.trim());
  }

  fail(`Failed to download any of: ${alternatives.join(', ')}\n${errors.join('\n')}`);
}

function runRequired(command, args, options = {}) {
  const { errorMessage, ...spawnOptions } = options;
  const result = spawnSync(command, args, { stdio: 'inherit', ...spawnOptions });

  if (result.error) {
    fail(`${errorMessage ?? `Failed to run ${command}`}: ${result.error.message}`);
  }

  if (result.status !== 0) {
    fail(errorMessage ?? `Command failed: ${command} ${args.join(' ')}`);
  }
}

function fail(message) {
  console.error(`[playwright] ${message}`);
  process.exit(1);
}
