module.exports = {
  extends: 'standard',
  env: {
    mocha: true
  },
  plugins: [
    'chai-friendly'
  ],
  globals: {
    expect: true
  },
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2
  }
}
