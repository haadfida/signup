import eslintPluginPlaywright from 'eslint-plugin-playwright';

export default [
  {
    plugins: { playwright: eslintPluginPlaywright },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    ignores: ['node_modules/', 'tests-examples/', 'playwright-report/'],
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'playwright/no-skipped-test': 'warn'
    }
  }
]; 