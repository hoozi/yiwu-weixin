import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/styles/reset.scss'
import '@/styles/base.scss'
import '@/styles/iconfont.scss'
import '@/styles/resetComp.scss'

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
