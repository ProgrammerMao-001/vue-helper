import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home.vue'
// import Father from '@/components/componentCommunication/father.vue'
// import Son from '@/components/componentCommunication/son.vue'

Vue.use(Router)

export default new Router({
  // routes: [
  //   // {
  //   //   path: '/',
  //   //   name: 'Home',
  //   //   meta: {
  //   //     title: 'home'
  //   //   },
  //   //   component: Home,
  //   // },
  //   {
  //     path: '/componentCommunication/father',
  //     name: 'Father',
  //     meta: {title: '企业详情'},
  //     component: Father,
  //   },
  //   {
  //     path: '/componentCommunication/son',
  //     name: 'Son',
  //     meta: {title: 'componentCommunication-son'},
  //     component: Son,
  //   },
  //   {
  //     path: '/',
  //     name: 'Home',
  //     meta: {
  //       title: '主页',
  //     },
  //     component: Home,
  //   },
  // ]

  routes: [
    {
      path: '/',
      component: () => import('@/components/home'),
      name: 'home',
    },
    {
      path: '/father',
      component: () => import('@/components/componentCommunication/father'),
      name: 'father',
      meta: {
        title: 'father'
      }
    },
    {
      path: '/son',
      component: () => import('@/components/componentCommunication/son'),
      name: 'son',
      meta: {
        title: 'son'
      }
    },
    {
      path: '/brother',
      component: () => import('@/components/componentCommunication/brother'),
      name: 'brother',
      meta: {
        title: 'brother'
      }
    },
  ]
})
