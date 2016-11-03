'use strict'

import Vue from 'vue'
import ListView from '../../../src/views/List.vue'

describe('List.vue', function () {
  it('should have a created hook', function () {
    expect(ListView.created).to.be.a('function')
  })

  it('should get loading text when have no item', function () {
    const vm = new Vue({
      template: '<div><list-view></list-view></div>',
      components: { ListView }
    }).$mount()
    expect(vm.$el.textContent.trim()).to.eql('loading..')
  })

  // FIXME, error: __vue_exports__ is not a function
  it.skip('should get render with mocked message', function () {
    const inject = require('!!vue?inject!../../../src/views/List.vue')
    const ListViewWithMock = inject({
      '../api': {
        getList () {
          const mockData = [{
            'name': 'mock1 name',
            'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c',
            'size': 111,
            'title': 'mock1 title',
            'date': '2016-01-01'
          }, {
            'name': 'mock2 name',
            'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c',
            'size': 222,
            'title': 'mock2 title',
            'date': '2016-01-02'
          }, {
            'name': 'mock3 name',
            'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c',
            'size': 333,
            'title': 'mock3 title',
            'date': '2016-01-03'
          }]
          return Promise.resolve(mockData)
        }
      },
      $route: {
        query: {
          keyword: ''
        }
      }
    })
    const vm = new Vue({
      template: '<div><list-view></list-view></div>',
      components: {
        'listView': ListViewWithMock
      }
    }).$mount()
    expect(vm.$el.querySelector('.list')).to.be.true
    expect(vm.$el.querySelectorAll('.list-item').length).to.equal(3)
  })
})
