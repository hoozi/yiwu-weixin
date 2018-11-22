import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { UPDATE_DIRECTION, UPDATE_SCREEN_LOADING_STATUS } from '@/store/mutationsType';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/fix',
    children: [
      {
        path: '/fix',
        name: 'fix',
        component: () => import('@/screens/Fix/index.vue'),
        meta: {
          screenName: '报修'
        }
      },
      {
        path: '/fix-result',
        name: 'fixResult',
        component: () => import('@/screens/Fix/FixResult.vue'),
        meta: {
          screenName: '搜索结果',
          keepAlive: true,
          leftOptions: {
            showBack: true
          }
        }
      },
      {
        path: '/fix-status',
        name: 'fixStatus',
        component: () => import('@/screens/Fix/FixStatus.vue'),
        meta: {
          screenName: '详情',
          leftOptions: {
            showBack: true
          }
        }
      }
    ]
  }
]

const router = new VueRouter({ routes });

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit(UPDATE_SCREEN_LOADING_STATUS, {screenLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit(UPDATE_DIRECTION, {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit(UPDATE_DIRECTION, {direction: ''})
      } else {
        store.commit(UPDATE_DIRECTION, { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/fix' && history.setItem(to.path, historyCount)
    store.commit(UPDATE_DIRECTION, {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
});

router.afterEach(function (to) {
  isPush = false
  store.commit(UPDATE_SCREEN_LOADING_STATUS, {screenLoading: false})
})

export default router

