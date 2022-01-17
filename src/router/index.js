import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Home',
      meta: {
        title: '',
      },
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            title: 'study-code',
          },
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/index.vue'),
        },
      ],
    },

    {
      path: '/demo',
      name: 'Demo',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/demo/demo.vue'),
    },
  ]
})
