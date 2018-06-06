import axios from 'axios'
import 'es6-promise/auto'

import conf from './config'
import { onlyTitle, onlyDate } from './utils'

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
export function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  let url = `https://api.github.com/repos/${conf.repo}/contents/`
  if (conf.path) url += conf.path
  if (conf.branch) url += `?ref=${conf.branch}`
  return url
}

/**
 * Format GitHub Api url for file content
 * @param {string} hash
 * @returns {string}
 */
export function getPostUrl (hash) {
  // @see https://developer.github.com/v3/git/blobs/#get-a-blob
  return `https://api.github.com/repos/${conf.repo}/git/blobs/${hash}`
}

/**
 * Format the search file url
 * @param {object} options 
 */
export function getSearchUrl (options) {
  const { query, type } = options

  // Not used next
  delete options.query
  delete options.type

  const optionStr = Object.keys(options)
    .reduce(
      (str, key) => str += `+${key}:${options[key]}`,
      `q=${query || ''}`
    )

  // @doc https://developer.github.com/v3/search/#search-code
  return `https://api.github.com/search/${type}?${optionStr}`
}

export { axios as axiosInstance }

// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

/**
 * Parse the file
 * @param {object} 
 */
const formatFile = ({name, sha, size}) => ({
  title: onlyTitle(name),
  date: onlyDate(name),
  sha,
  size
})

export default {

  getList () {
    if (Cache.has('list')) {
      // Read from cache
      return Promise.resolve(Cache.get('list'))
    } else {
      return axios.get(getListUrl())
        .then(res => res.data)
        .then(arr => {
          // Data cleaning
          const list = arr.map(formatFile)
          // Save into cache
          Cache.set('list', list)
          // ..then return
          return list
        })
    }
  },

  getDetail (hash) {
    const httpOpts = {
      // https://developer.github.com/v3/media/#raw-1
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }
    const cacheKey = 'post.' + hash

    if (Cache.has(cacheKey)) {
      // Read from cache
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios.get(getPostUrl(hash), httpOpts)
        .then(res => res.data)
        .then(content => {
          // Save into cache
          Cache.set(cacheKey, content)
          // ..then return
          return content
        })
    }
  },

  searchFile (query, type = 'code', extension = 'md') {
    const searchOpts = {
      query,
      type,
      extension,
      repo: conf.repo,
      path: conf.path
    }
    const cacheKey = `search.${query}`

    if (Cache.has(cacheKey)) {
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios.get(getSearchUrl(searchOpts))
        .then(res => res.data)
        .then(data => {
          const result = data.items.map(formatFile)
          Cache.set(cacheKey, result)
          return result
        })
    }
  }
}
