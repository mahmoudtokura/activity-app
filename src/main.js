import Vue from 'vue'
import App from './App.vue'
var moment = require('moment'); // require

Vue.config.productionTip = false

Vue.filter('date', function (val) {
  if(!val) return ''
  return moment(val).format('LLL');
})

new Vue({
  render: h => h(App),
}).$mount('#app')
