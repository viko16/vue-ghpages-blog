const Nightmare = require('nightmare')
const blogConfig = require('../../../src/config')

const base = 'http://localhost:8081/'

describe('Layout', function () {
  this.timeout('10s')

  let nightmare = null

  beforeEach(() => {
    nightmare = new Nightmare()
  })

  describe('common', function () {
    it('should load without error', function (done) {
      nightmare
        .goto(base)
        .end()
        .then(_ => done())
        .catch(done)
    })

    it('should got correct document.title', function (done) {
      nightmare
        .goto(base)
        .evaluate(function () {
          return document.title
        })
        .end()
        .then(title => {
          expect(title).to.equal(blogConfig.blogTitle)
          done()
        })
        .catch(done)
    })
  })

  describe('header', function () {
    it('should have correct header', function (done) {
      nightmare
        .goto(base)
        .exists('.header > input')
        .then(isExist => {
          expect(isExist).to.be.true
          done()
        })
        .catch(done)
    })

    it('should have correct header title', function (done) {
      nightmare
        .goto(base)
        .evaluate(function () {
          return document.querySelector('.header > a').innerText
        })
        .end()
        .then(title => {
          expect(title).to.equal(blogConfig.blogTitle.toUpperCase())
          done()
        })
        .catch(done)
    })
  })

  describe('footer', function () {
    it('should have copyright', function (done) {
      nightmare
        .goto(base)
        .wait('.footer')
        .evaluate(function () {
          return document.querySelector('.footer').innerText
        })
        .end()
        .then(text => {
          const year = new Date().getFullYear()
          expect(text).to.equal(`Copyright © ${year} | Powered by vue-ghpages-blog`)
          done()
        })
        .catch(done)
    })

    it('should specify GitHub repo link', function (done) {
      nightmare
        .goto(base)
        .wait('.footer')
        .evaluate(function () {
          const element = document.querySelector('.footer > a')
          return {
            target: element.target,
            href: element.href
          }
        })
        .end()
        .then(({ target, href }) => {
          expect(target).to.equal('_blank')
          expect(href).to.equal('https://github.com/viko16/vue-ghpages-blog')
          done()
        })
        .catch(done)
    })
  })
})
