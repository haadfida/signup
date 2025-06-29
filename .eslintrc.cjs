module.exports = {
  env: { node: true, es2022: true },
  extends: ['eslint:recommended', 'plugin:playwright/recommended'],
  plugins: ['playwright'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['node_modules/', 'tests-examples/', 'playwright-report/'],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'playwright/no-skipped-test': 'warn'
  }
}; 