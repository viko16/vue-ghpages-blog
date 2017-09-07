'use strict'

import Vue from 'vue'

// NOTE: global filter have been registered in `test/unit/index.js`

describe('Custom filter', function () {
  describe('timeago', function () {
    const getRenderedText = msg => {
      const vm = new Vue({
        template: '<div>{{ msg | timeago }}</div>',
        data: { msg }
      }).$mount()
      return vm.$el.textContent
    }

    it('should get the filter if registered', function () {
      const f = Vue.filter('timeago') // getter
      expect(f).to.be.a('function')
    })

    it('should format the date in chinese', function () {
      expect(getRenderedText(Date.now())).to.equal('刚刚')
    })

    it('should get empty string when passed bad args', function () {
      expect(getRenderedText(undefined)).to.equal('')
      expect(getRenderedText(null)).to.equal('')
      expect(getRenderedText('')).to.equal('')
    })
  })

  describe('formatDate', function () {
    const getRenderedText = msg => {
      const vm = new Vue({
        template: '<div>{{ msg | formatDate }}</div>',
        data: { msg }
      }).$mount()
      return vm.$el.textContent
    }

    it('should get the filter if registered', function () {
      const f = Vue.filter('formatDate') // getter
      expect(f).to.be.a('function')
    })

    it('should effect like built-in', function () {
      const val = '1504707097000'
      const expected = new Date(val).toLocaleDateString()
      expect(getRenderedText(val)).to.equal(expected)
    })
  })
})
