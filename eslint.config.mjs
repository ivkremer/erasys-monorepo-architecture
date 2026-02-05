import { defineConfig } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';

const eslintConfig = defineConfig([
  // Base rules (no framework-specific plugins)
  {
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': 'error',
      'arrow-spacing': 'error',
      curly: 'error',
      'default-case': 'error',
      'dot-location': ['error', 'property'],
      'dot-notation': 'error',
      'eol-last': ['error'],
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-caller': 'error',
      'no-console': 'error',
      'no-div-regex': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-eval': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': 'error',
      'no-inline-comments': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
        },
      ],
      'no-multi-assign': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],
      'one-var-declaration-per-line': 'error',
      'padded-blocks': ['error', 'never'],
      'padding-line-between-statements': 'error',
      'prefer-const': 'error',
      'prefer-spread': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': ['error', 'always'],
      'wrap-iife': 'error',
      yoda: 'error',
    },
  },
  // TypeScript-specific rules and parser
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // React-specific rules
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      'react/jsx-tag-spacing': 2,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
    },
  },
]);

export default eslintConfig;
