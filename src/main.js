'use strict'

import Vue from 'vue'
import router from './router'

import App from './App.vue'

Vue.config.debug = process.env.NODE_ENV !== 'production'

const app = new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app')

export { app, router }
