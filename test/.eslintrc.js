module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    mocha: true,
    node: true
  },
  plugins: [
    'chai-friendly'
  ],
  globals: {
    expect: true
  },
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'comma-dangle': 2
  }
}
