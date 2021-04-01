import Vue from 'vue'
import App from './App.vue'
import auth from './auth'
import router from './routes'

Vue.config.productionTip = false
Vue.prototype.$auth = auth

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.addEventListener('load', auth.init)
