import Vue from 'vue'
Vue.config.productionTip = false

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
