module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 'off',
    'arrow-parens': 'off',
    'space-before-function-paren': 'off',
    'no-useless-escape': 'off',
    curly: 'off',
  },
}
