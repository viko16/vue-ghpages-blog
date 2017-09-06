'use strict'

// use compiler-included build
import Vue from 'vue/dist/vue.min.js'
import filter from '@/utils/filter'

// setup Vue filter
filter(Vue)

describe('Custom filter', function () {
  describe('timeago', function () {
    const getVm = msg => {
      return new Vue({
        template: '<div>{{ msg | timeago }}</div>',
        data: { msg }
      }).$mount()
    }

    it('should get the filter if registered', function () {
      const f = Vue.filter('timeago') // getter
      expect(f).to.be.a('function')
    })

    it('should format the date in chinese', function () {
      const vm = getVm(Date.now())
      expect(vm.$el.textContent).to.equal('刚刚')
    })

    it('should get empty string when passed bad args', function () {
      const vm = getVm('')
      expect(vm.$el.textContent).to.equal('')
    })
  })

  describe('formatDate', function () {
    const getVm = msg => {
      return new Vue({
        template: '<div>{{ msg | formatDate }}</div>',
        data: { msg }
      }).$mount()
    }

    it('should get the filter if registered', function () {
      const f = Vue.filter('formatDate') // getter
      expect(f).to.be.a('function')
    })

    it('should effect like built-in', function () {
      const val = '1504707097000'
      const vm = getVm(val)
      const expected = new Date(val).toLocaleDateString()
      expect(vm.$el.textContent).to.equal(expected)
    })
  })
})
