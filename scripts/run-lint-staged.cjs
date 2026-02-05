#!/usr/bin/env node

/*
 Cross-workspace lint-staged runner:
 - Works when Husky runs from any workspace subdirectory.
 - Resolves the Git root and executes lint-staged there.
 - Uses locally installed lint-staged if available; otherwise falls back to a temporary npx download.
*/

const { execSync } = require('node:child_process');
const { chdir } = require('node:process');

function log(msg) {
  try {
    process.stdout.write(`[run-lint-staged] ${msg}\n`);
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
  // Skip when not inside a Git repo (e.g., some CI contexts)
  let gitRoot = '';
  try {
    gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  } catch {
    return process.exit(0);
  }

  try {
    chdir(gitRoot);
  } catch (e) {
    try {
      process.stderr.write(`[run-lint-staged] Failed to change directory to git root: ${e?.message || e}\n`);
    } catch (_) {}
    return process.exit(1);
  }

  // Detect local lint-staged without executing tasks to avoid double runs
  if (tryExec('npx --no-install lint-staged --version', { stdio: 'ignore' })) {
    try {
      execSync('npx --no-install lint-staged', { stdio: 'inherit' });
      return process.exit(0);
    } catch (e) {
      // Propagate actual exit code from lint-staged (e.g., when tasks fail)
      return process.exit(typeof e.status === 'number' ? e.status : 1);
    }
  }

  // Fallback to temporary install including tools invoked by lint-staged
  log('Local lint-staged not found, using temporary npx package...');
  // Install lint-staged plus its toolchain so spawned commands are available
  // Note: npx with multiple -p flags makes all binaries available on PATH for the run
  try {
    execSync('npx -y -p lint-staged@^16 -p prettier@^3 -p eslint@^9 lint-staged', { stdio: 'inherit' });
    return process.exit(0);
  } catch (e) {
    try {
      process.stderr.write(
        '[run-lint-staged] Failed to run lint-staged. Ensure network access or install it in devDependencies.\n',
      );
    } catch (_) {}
    return process.exit(typeof e.status === 'number' ? e.status : 1);
  }
})();
