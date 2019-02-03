import Vue from 'vue'
import VueRouter from 'vue-router'

import PageList from './components/PageList.vue'
import PagePost from './components/PagePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'page-list',
    component: PageList
  },
  {
    path: '/post/:hash',
    name: 'page-post',
    component: PagePost
  }
]

export default new VueRouter({
  mode: 'hash',
  routes
})
