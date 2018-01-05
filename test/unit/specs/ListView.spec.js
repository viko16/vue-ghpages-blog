'use strict'

/* eslint-disable import/no-webpack-loader-syntax */

import Vue from 'vue'
import { mount } from 'avoriaz'
import _ from 'lodash'
import sinon from 'sinon'
import ListView from '@/views/List.vue'
import router from '@/router'

Vue.config.productionTip = false
Vue.config.devtools = false

const mockData = [{
  'name': 'mock1 name',
  'sha': '35d4387629a7ff34f6d9f1d068101cac958f057c',
  'size': 111,
  'title': 'mock1 title',
  'date': '2016-01-03'
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
  'title': 'mock3 🤔 title',
  'date': '2016-01-01'
}]

describe('List.vue', function () {
  const getMockListView = mockData => {
    // https://vue-loader.vuejs.org/en/workflow/testing-with-mocks.html
    const injector = require('!!vue-loader?inject!@/views/List.vue')
    return injector({
      '../api': { getList: () => Promise.resolve(mockData) }
    })
  }

  it('should have a mounted hook', function () {
    expect(ListView.mounted).to.be.a('function')
  })

  it('should call methods "loadList" after mounted', async function () {
    const ListViewWithMock = getMockListView(mockData)
    // initial data
    expect(ListViewWithMock.data().loading).to.be.true

    const loadList = sinon.spy(ListViewWithMock.methods, 'loadList')

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()
    // after mount
    expect(loadList.called).to.be.true
    expect(wrapper.vm.loading).to.be.false

    loadList.restore()
  })

  it('should render "loading" text when loading', function () {
    const wrapper = mount(ListView, { router })
    expect(wrapper.text()).to.equal('loading..')
  })

  it('should render correct list', async function () {
    const ListViewWithMock = getMockListView(mockData)

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()

    expect(wrapper.find('.list')).not.to.be.empty
    expect(wrapper.find('.list-item').length).to.equal(3)
  })

  it('should render correct post item', async function () {
    const ListViewWithMock = getMockListView(mockData)

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()

    const item = wrapper.find('.list-item')[1]

    // test the spelling, URL, className
    const linkEl = item.find('a')[0]
    expect(linkEl.text().trim()).to.equal(mockData[1].title)
    expect(linkEl.getAttribute('href')).to.equal('/post/' + mockData[1].sha)
    expect(linkEl.hasClass('item-title')).to.be.true

    // test the readability, format, className
    const timeEl = item.find('time')[0]
    expect(timeEl.text()).to.match(/\d+年前/)
    const expectDate = new Date(mockData[1].date).toLocaleDateString()
    expect(timeEl.getAttribute('title')).to.equal(expectDate)
    expect(timeEl.hasClass('item-date')).to.be.true
  })

  it('should render correct post that order by date', async function () {
    const shuffled = _.shuffle(mockData)
    const ListViewWithMock = getMockListView(shuffled)

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()

    const items = wrapper.find('.list-item .item-title')
    expect(items[0].text().trim()).to.equal(mockData[0].title)
    expect(items[2].text().trim()).to.equal(mockData[2].title)
  })

  it('should render filtered list when input keyword', async function () {
    const ListViewWithMock = getMockListView(mockData)
    const _router = _.clone(router)

    const wrapper = await mount(ListViewWithMock, { router: _router })

    // fuzzy search 'mock2'
    _router.push({ query: { q: 'mock2' } })
    wrapper.update()
    expect(wrapper.find('.list-item').length).to.equal(1)
    expect(wrapper.find('.item-title')[0].text().trim()).to.equal(mockData[1].title)

    // search ''
    _router.push({ query: { q: '' } })
    wrapper.update()
    expect(wrapper.find('.list-item').length).to.equal(3)

    // typo
    _router.push({ query: { q: 'ghkgvhjlfguhiug' } })
    wrapper.update()
    expect(wrapper.find('.list-item').length).to.equal(0)

    // emoji
    _router.push({ query: { q: '🤔' } })
    wrapper.update()
    expect(wrapper.find('.list-item').length).to.equal(1)
    expect(wrapper.find('.item-title')[0].text().trim()).to.equal(mockData[2].title)
  })

  it('should render "nothing" when list is empty', async function () {
    const ListViewWithMock = getMockListView([])

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()

    expect(wrapper.find('.no-content')[0].text()).to.equal('nothing..')
    expect(wrapper.find('.list')).to.be.empty
    expect(wrapper.find('.list-item')).to.be.empty
  })

  it('should render "nothing" when api reject', async function () {
    const injector = require('!!vue-loader?inject!@/views/List.vue')
    const ListViewWithMock = injector({
      '../api': { getList: () => Promise.reject(new Error('test getList() error')) }
    })

    const wrapper = await mount(ListViewWithMock, { router })
    wrapper.update()

    expect(wrapper.vm.loading).to.be.false
    expect(wrapper.find('.no-content')[0].text()).to.equal('nothing..')
    expect(wrapper.find('.list')).to.be.empty
    expect(wrapper.find('.list-item')).to.be.empty
  })
})
