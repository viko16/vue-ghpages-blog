import Vue from 'vue'
import VueResource from 'vue-resource'
import { Promise } from 'es6-promise'

import conf from '../conf.json'
import { objReduce, onlyTitle, onlyDate } from '../utils'

// Install plugin
Vue.use(VueResource)

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  let url = `https://api.github.com/repos/${conf.repo}/contents/`
  if (conf.path) url += conf.path
  if (conf.branch) url += `?ref=${conf.branch}`
  return url
}

/**
 * Format Github Api url for file content
 * @param {string} hash
 * @returns {string}
 */
function getPostUrl (hash) {
  // @see https://developer.github.com/v3/git/blobs/#get-a-blob
  return `https://api.github.com/repos/${conf.repo}/git/blobs/${hash}`
}

export default {

  getList () {
    return new Promise((resolve, reject) => {
      if (window.sessionStorage &&
        window.sessionStorage.hasOwnProperty('list')) {
        // Read from sessionStorage
        resolve(JSON.parse(window.sessionStorage.getItem('list')))
      } else {
        Vue.http.get(getListUrl())
          .then(res => {
            let list = res.body
            list = list.map(els => objReduce(els, ['name', 'sha', 'size']))
                        .map(el => {
                          el.title = onlyTitle(el.name)
                          el.date = onlyDate(el.name)
                          return el
                        })
            // Save into sessionStorage
            window.sessionStorage && window.sessionStorage.setItem('list', JSON.stringify(list))
            // ..then return
            resolve(list)
          }, reject)
      }
    })
  },

  getDetail (hash) {
    let httpOpts = {
      // https://developer.github.com/v3/media/#raw-1
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }
    let cacheKey = 'post.' + hash

    return new Promise((resolve, reject) => {
      if (window.sessionStorage &&
        window.sessionStorage.hasOwnProperty(cacheKey)) {
        // Read from sessionStorage
        resolve(JSON.parse(window.sessionStorage.getItem(cacheKey)))
      } else {
        Vue.http.get(getPostUrl(hash), httpOpts)
          .then(res => {
            let content = res.body
            // Save into sessionStorage
            window.sessionStorage && window.sessionStorage.setItem(cacheKey, JSON.stringify(content))
            // ..then return
            resolve(content)
          }, reject)
      }
    })
  }

}
