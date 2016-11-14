import Vue from 'vue'
import router from './router'
import App from './App.vue'
import filter from './utils/filter'

// setup Vue filter
filter(Vue)

// whether to allow vue-devtools inspection
// false in production builds
Vue.config.devtools = process.env.NODE_ENV !== 'production'

// create the app instance and mount to #app
const app = new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app')

export { app, router }
