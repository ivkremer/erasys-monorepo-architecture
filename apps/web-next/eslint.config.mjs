import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...rootConfig,
  globalIgnores(['.next/**', 'out/**', 'build/**']),
]);
