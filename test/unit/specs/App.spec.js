'use strict'

import Vue from 'vue'
import App from '../../../src/App.vue'
import router from '../../../src/router'
import conf from '../../../src/conf.json'

describe('App.vue', function () {
  it('should mount correctly', function () {
    const app = new Vue(
      Vue.util.extend({ router }, App)
    ).$mount()
    expect(app.$route).to.be.a('object')
    expect(app.$children).not.to.be.empty
    // methods
    expect(app.resetSearch).to.be.a('function')
    expect(app.selectSearchText).to.be.a('function')
  })

  it('should have correct data', function () {
    const correctTitle = conf.blogTitle
    expect(App.data).to.be.a('function')
    expect(App.data().title).to.equal(correctTitle)
    expect(App.data().keyword).to.be.empty
  })
})
