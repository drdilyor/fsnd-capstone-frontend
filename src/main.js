import Vue from 'vue'
import App from './App.vue'
import auth from './auth'
import api from './api'
import router from './routes'

Vue.config.productionTip = false
Vue.prototype.$auth = auth
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('load', auth.init)
