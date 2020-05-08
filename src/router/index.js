/**
 * 路由js文件
 * */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/msite'
  }, {
    path: '/msite',
    meta: {
      showFooter: true
    },
    component: () => import('../pages/MSite/MSite.vue')
  }, {
    path: '/order',
    meta: {
      showFooter: true
    },
    component: () => import('../pages/Order/Order.vue')
  }, {
    path: '/profile',
    meta: {
      showFooter: true
    },
    component: () => import('../pages/Profile/Profile.vue')
  }, {
    path: '/search',
    meta: {
      showFooter: true
    },
    component: () => import('../pages/Search/Search.vue')
  }, {
    path: '/login',
    component: () => import('../pages/Login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
