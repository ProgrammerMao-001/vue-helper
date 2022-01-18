import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      meta: {
        title: '',
      },
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: 'study-code',
          },
          component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
        },
      ],
    },
    {
      path: '/demo',
      name: 'Demo',
      meta: {
        title: 'demo'
      },
      component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/demo.vue'),
    },

    // ********************************** 系统管理 **********************************
    {
      path: '/system',
      redirect: '/system',
      name: 'auth',
      meta: {
        title: '权限管理',
      },
      component: Home,
      children: [
        {
          path: '/system/auth',
          name: 'Auth',
          meta: {
            title: '权限管理',
          },
          component: () => import(/* webpackChunkName: "auth" */ '@/views/system/auth/auth.vue'),
        },
        {
          path: '/system/role',
          name: 'Role',
          meta: {
            title: '角色管理',
          },
          component: () => import(/* webpackChunkName: "role" */ '@/views/system/role/role.vue'),
        },
        {
          path: '/system/menu',
          name: 'Menu',
          meta: {
            title: '菜单管理',
          },
          component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu/menu.vue'),
        },
        {
          path: '/system/group',
          name: 'Group',
          meta: {
            title: '分组管理',
          },
          component: () => import(/* webpackChunkName: "group" */ '@/views/system/group/group.vue'),
        },
      ],
    },

    // ********************************** 用户管理 **********************************
    {
      path: '/user',
      redirect: '/user/content',
      name: 'User',
      meta: {
        title: '邮箱管理',
      },
      component: Home,
      children: [
        {
          path: '/user/content',
          redirect: '/user/content/email',
          name: 'Content',
          meta: {
            title: '账号管理',
          },
          // component: Home,
          component: () => import(/* webpackChunkName: "email" */ '@/views/user/content/email/email.vue'),
          children: [
            {
              path: '/user/content/email',
              name: 'Email',
              meta: {
                title: '邮箱管理',
              },
              component: () => import(/* webpackChunkName: "email" */ '@/views/user/content/email/email.vue'),
            },
            {
              path: '/user/content/pass',
              name: 'Pass',
              meta: {
                title: '密码管理',
              },
              component: () => import(/* webpackChunkName: "pass" */ '@/views/user/content/pass/pass.vue'),
            },
          ]
        },
        {
          path: '/user/integral',
          name: 'Integral',
          meta: {
            title: '积分管理',
          },
          component: () => import(/* webpackChunkName: "integral" */ '@/views/user/integral/integral.vue'),
        },
      ],
    },

    // ********************************** 内容管理 **********************************
    {
      path: '/content',
      redirect: '/content',
      name: 'Content',
      meta: {
        title: '内容管理',
      },
      component: Home,
      children: [
        {
          path: '/content/classify',
          name: 'Classify',
          meta: {
            title: '分类管理',
          },
          component: () => import(/* webpackChunkName: "classify" */ '@/views/content/classify/classify.vue'),
        },
        {
          path: '/content/article',
          name: 'Article',
          meta: {
            title: '文章管理',
          },
          component: () => import(/* webpackChunkName: "article" */ '@/views/content/article/article.vue'),
        },
        {
          path: '/content/comment',
          name: 'Comment',
          meta: {
            title: '评论管理',
          },
          component: () => import(/* webpackChunkName: "comment" */ '@/views/content/comment/comment.vue'),
        },
      ],
    },

  ]
})
