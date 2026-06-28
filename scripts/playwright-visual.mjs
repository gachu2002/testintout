import { spawn } from 'node:child_process';

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
