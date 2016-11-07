import Timeago from 'timeago.js'

const timeago = new Timeago(null, 'zh_CN')

export default (Vue) => {
  Vue.filter('timeago', function (str) {
    if (!str) return ''
    return timeago.format(new Date(str))
  })
}
