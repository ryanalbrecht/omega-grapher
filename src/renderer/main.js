import Vue from 'vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuelidate);

//create menu
require('./menu').default(router, store);

if(process.env.NODE_ENV === 'development'){
  const debugMenu = require('debug-menu');
  debugMenu.install();  // activate context menu
}


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
