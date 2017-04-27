import Vue from 'vue'
import router from './router'
import App from './App.vue'
import filter from './utils/filter'

// setup Vue filter
filter(Vue)

// whether to allow vue-devtools inspection
// false in production builds
Vue.config.devtools = process.env.NODE_ENV !== 'production'

const app = new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})

export { app, router }
