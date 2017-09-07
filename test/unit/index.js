import Vue from 'vue'

import filter from '@/utils/filter'
filter(Vue)

Vue.config.productionTip = false
Vue.config.devtools = false

const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
