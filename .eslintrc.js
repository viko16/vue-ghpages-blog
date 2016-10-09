module.exports = {
  'root': true,
  'extends': 'standard',
  'env': {
    'node': true,
    'browser': true
  },
  'plugins': [
    'html'
  ],
  'rule': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
