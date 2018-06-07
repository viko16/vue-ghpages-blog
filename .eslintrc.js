module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2017
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': 2
  }
}
