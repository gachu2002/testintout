import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const ensureResult = spawnSync(
  process.execPath,
  [path.join(scriptDirectory, 'ensure-playwright-chromium.mjs')],
  {
    stdio: 'inherit',
  },
);

if (ensureResult.error) {
  console.error(ensureResult.error);
  process.exit(1);
}

if (ensureResult.status !== 0) {
  process.exit(ensureResult.status ?? 1);
}

const args = process.argv.slice(2);

if (args[0] === '--') {
  args.shift();
}

const child = spawn('playwright', ['test', ...args], {
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
