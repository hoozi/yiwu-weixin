import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
//import { BusPlugin, LoadingPlugin } from 'vux'
import { sync } from 'vuex-router-sync'
import LoadingPlugin from 'vux/src/plugins/loading'
import BusPlugin from 'vux/src/plugins/bus'
import ToastPlugin from 'vux/src/plugins/toast'
import '@/styles/reset.scss'
import '@/styles/base.scss'
import '@/styles/iconfont.scss'
import '@/styles/resetComp.scss'

sync(store, router);

Vue.config.productionTip = false

Vue.use(BusPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
