import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import http from 'node:http';

import ts from 'typescript';

const port = Number(process.env.MOCK_API_PORT || 3001);
const mockData = await loadTsModule('./data.ts');
const { resolveMockResponse } = await loadTsModule('./resolver.ts');
let isAuthenticated = process.env.MOCK_AUTHENTICATED !== 'false';

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin || 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/api/auth/login') {
    isAuthenticated = true;
    sendRedirect(response, getRedirectTarget(url));
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/auth/logout') {
    isAuthenticated = false;
    sendRedirect(response, getRedirectTarget(url));
    return;
  }

  if (!request.url) {
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  if (url.pathname === '/api/v0/auth/check') {
    sendJson(response, 200, isAuthenticated ? mockData.authSessionResponse : null);
    return;
  }

  if (url.pathname === '/api/v0/setting') {
    sendJson(
      response,
      isAuthenticated ? 200 : 401,
      isAuthenticated ? mockData.accountSettingResponse : { error: 'Unauthenticated' },
    );
    return;
  }

  const resolved = resolveMockResponse(mockData, request.method, request.url);

  if (resolved) {
    sendJson(response, resolved.status, resolved.payload);
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'Method not allowed' });
    return;
  }

  sendJson(response, 404, { error: 'Mock route not found', path: url.pathname });
});

server.listen(port, () => {
  console.log(`Mock API server listening on http://localhost:${port}/api`);
});

async function loadTsModule(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const encodedModule = Buffer.from(outputText).toString('base64');

  return import(`data:text/javascript;base64,${encodedModule}`);
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function sendRedirect(response, target) {
  response.writeHead(302, { Location: target });
  response.end();
}

function getRedirectTarget(url) {
  const redirect = url.searchParams.get('redirect');

  if (!redirect) {
    return '/';
  }

  try {
    return decodeURIComponent(redirect);
  } catch {
    return '/';
  }
}
