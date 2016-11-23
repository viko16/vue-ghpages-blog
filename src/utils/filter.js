import Timeago from 'timeago.js'

const timeago = new Timeago(null, 'zh_CN')

export default (Vue) => {
  // https://github.com/hustcc/timeago.js#1-usage
  Vue.filter('timeago', str => {
    if (!str) return ''
    return timeago.format(new Date(str))
  })

  // get a string representing the date portion of the given Date
  Vue.filter('formatDate', date => {
    return new Date(date).toLocaleDateString()
  })
}
