import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import systemAuth from '@/views/system/auth/auth'
import systemRole from '@/views/system/role/role'
import systemMenu from '@/views/system/menu/menu'
import systemGroup from '@/views/system/group/group'


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
      meta: {
        title: 'demo'
      },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/demo/demo.vue'),
    },

    // ********************************** 系统管理 **********************************

    {
      id: '235sdfask43gskesgsekg',
      name: 'auth',
      path: '/system/auth',
      component: systemAuth,
      children: [
        {
          id: 'jsajkw3sa3qfpafsfp6fhfdg',
          parentId: '235sdfask43gskesgsekg',
          name: 'auth',
          meta: {title: '权限管理'},
          path: '/system/auth',
          // component: systemAuth,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/system/auth/auth.vue'),
        },
        {
          id: 'wqoep9fdsfef9rfaop2jf',
          parentId: '235sdfask43gskesgsekg',
          name: 'role',
          meta: {title: '角色管理'},
          path: '/system/role',
          component: systemRole,
          // component: () => import(/* webpackChunkName: "dashboard" */ '@/views/system/role/role.vue'),
        },
        {
          id: 'wqoep9fdsfef9rfa122jf',
          parentId: '235sdfask43gskesgsekg',
          name: 'menu',
          meta: {title: '菜单管理'},
          path: '/system/menu',
          component: systemMenu,
          // component: () => import(/* webpackChunkName: "dashboard" */ '@/views/system/menu/menu.vue'),
        },
        {
          id: 'wqoep9fdsfef7rfaop2jf',
          parentId: '235sdfask43gskesgsekg',
          name: 'group',
          meta: {title: '分组管理'},
          path: '/system/group',
          component: systemGroup,
        },
      ],
    },
  ]
})
