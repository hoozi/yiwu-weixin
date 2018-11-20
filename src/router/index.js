import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
  {
    path: '/fix',
    name: 'fix',
    component: () => import('@/screens/Fix.vue'),
    meta: {
      pageName: '报修'
    }
  }
]

export default new VueRouter({ routes })

