'use strict'

// import Vue from 'vue'
import { mount } from 'avoriaz'

import App from '@/App.vue'
import router from '@/router'
import conf from '@/config'
import SearchBar from '@/components/searchBar.vue'

describe('App.vue', function () {
  it('should mount correctly', function () {
    const wrapper = mount(App, { router })
    expect(wrapper.vm.$route).to.be.a('object')
    expect(wrapper.vm.$children).not.to.be.empty
  })

  it('should render blog title', function () {
    const wrapper = mount(App, { router })
    const renderedTitle = wrapper.find('.header a')[0].text()
    expect(renderedTitle).to.equal(conf.blogTitle)
  })

  it('should render search bar in list page', async function () {
    const wrapper = await mount(App, { router })
    router.push('/')

    expect(wrapper.vm.isPageList).to.be.true
    expect(wrapper.contains(SearchBar)).to.be.true

    // wait for dom update
    wrapper.update()
    const expectHtml = `<input placeholder="Search.." type="search" class="searchbar-input">`
    expect(wrapper.find('.searchbar-input')[0].html()).to.equal(expectHtml)
  })

  it('should not render search bar in post page', async function () {
    const wrapper = await mount(App, { router })
    router.push('/post/f7fcd01fd1d3d887283e4d1ba511d84a4acd19d6')

    expect(wrapper.vm.isPageList).to.be.false

    // wait for dom update
    wrapper.update()
    expect(wrapper.find('.searchbar-input')).to.be.empty
  })
})
