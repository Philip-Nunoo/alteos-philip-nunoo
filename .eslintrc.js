module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn',
        eqeqeq: ['error', 'always'],
        'no-fallthrough': 'error',
        'no-redeclare': 'error',
        'no-unused-expressions': 'error',
        'no-shadow': 'warn',
        'no-use-before-define': ['error', { functions: false, classes: true }],
        indent: ['error', 2],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-var': 'error',
    },
};