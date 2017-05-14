// mocha global setup and teardown
// https://github.com/mochajs/mocha/issues/1460#issuecomment-93862610

// Setup http-server
const path = require('path')
const httpServer = require('http-server')
const server = httpServer.createServer({
  // The output folder. Run npm run build first.
  root: path.resolve(__dirname, '../../dist')
})
// Setup Chai
const chai = require('chai')
global.expect = chai.expect

before(function (done) {
  server.listen(8081, done)
})

after(function () {
  server.close()
})
