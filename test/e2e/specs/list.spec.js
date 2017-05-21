const Nightmare = require('nightmare')

const base = 'http://localhost:8081/'

describe('List', function () {
  this.timeout('10s')

  let nightmare = null

  beforeEach(() => {
    nightmare = new Nightmare()
  })

  describe('List construction', function () {
    it('should have at least 1 article', function (done) {
      nightmare
        .goto(base)
        .wait('.list')
        .evaluate(function () {
          return document.querySelectorAll('.list > .list-item').length
        })
        .end()
        .then(length => {
          expect(length).to.be.at.least(1)
          done()
        })
        .catch(done)
    })
  })

  describe('List item construction', function () {
    it('should have title & date', function (done) {
      nightmare
        .goto(base)
        .wait('.list')
        .evaluate(function () {
          // get the first one
          const listItem = document.querySelector('.list > .list-item')
          const itemTitle = listItem.querySelector('.item-title')
          const itemDate = listItem.querySelector('.item-date')
          return {
            title: itemTitle.innerText,
            href: itemTitle.href,
            dateText: itemDate.innerText
          }
        })
        .end()
        .then(({ title, href, dateText }) => {
          expect(title).to.not.be.empty
          expect(dateText).to.not.be.empty
          expect(href).to.contain('/post/')
          done()
        })
        .catch(done)
    })
  })

  describe('List item navigation', function () {
    it('should goto post page', function (done) {
      nightmare
        .goto(base)
        .wait('.list')
        .click('.list .list-item a.item-title')
        .wait(100)
        .exists('.post-view')
        .end()
        .then(isExist => {
          expect(isExist).to.be.true
          done()
        })
        .catch(done)
    })
  })
})
