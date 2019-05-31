module.exports = {
    parser: 'vue-eslint-parser',
    root: true,
    env: {
        node: true,
        es6: true,
        browser: true,
        commonjs: true
    },
    extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'plugin:vue/essential', '@vue/typescript'],
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off'
    }
};
