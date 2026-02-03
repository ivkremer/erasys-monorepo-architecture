import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React Hooks recommended rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // React Refresh recommended for Vite/React
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  globalIgnores(['dist/**'])
]);
