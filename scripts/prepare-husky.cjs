#!/usr/bin/env node

/*
 Cross-workspace husky installer:
 - Works when running `npm i` from any workspace (e.g., apps/web-next).
 - Installs git hooks in the repository root.
 - Uses locally installed husky if available; otherwise falls back to a temporary npx download.
*/

const { execSync } = require('node:child_process');
const { chdir } = require('node:process');

function log(msg) {
  try {
    process.stdout.write(`[prepare-husky] ${msg}\n`);
  } catch (_) {}
}

function tryExec(cmd, options = {}) {
  try {
    execSync(cmd, { stdio: 'inherit', ...options });
    return true;
  } catch (_) {
    return false;
  }
}

(function main() {
  // If not inside a git repository, skip silently (e.g., during tarball installs)
  let gitRoot = '';
  try {
    gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch {
    // Not a git repo; nothing to install
    return process.exit(0);
  }

  try {
    chdir(gitRoot);
  } catch (e) {
    try {
      process.stderr.write(`[prepare-husky] Failed to change directory to git root: ${e?.message || e}\n`);
    } catch (_) {}
    return process.exit(1);
  }

  // Prefer locally installed husky (from devDependencies in the monorepo root)
  if (tryExec('npx --no-install husky')) {
    return process.exit(0);
  }

  // Fallback: fetch husky temporarily to install hooks
  log('Local husky not found, using temporary npx package...');
  if (tryExec('npx -y -p husky@^9 husky')) {
    return process.exit(0);
  }

  try {
    process.stderr.write(
      '[prepare-husky] Failed to run husky. Ensure git is available and network access is permitted.\n',
    );
  } catch (_) {}
  process.exit(1);
})();
