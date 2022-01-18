import Router from "vue-router";

export default new Router({
  routes: [
    {
      path: '/nested',
      component: Layout,
      meta: {
        icon: 'svg-layers',
        title: '路由嵌套'
      },
      children: [
        {
          path: 'menu1',
          meta: {icon: 'share', title: '嵌套路由1'},
          component: () => import('@/views/nested/menu1/index'),
          children: [
            {
              path: 'menu1-1',
              name: 'menu1-1',
              component: () => import('@/views/introduction/index'),
              meta: {icon: 'success', title: '嵌套路由1-1'}
            },
            {
              path: 'menu1-1',
              name: 'menu1-1',
              component: () => import('@/views/introduction/index'),
              meta: {icon: 'success', title: '嵌套路由1-1'}
            }
          ]
        },
        {
          path: 'menu2',
          name: 'menu2',
          component: () => import('@/views/user/add'),
          meta: {icon: 'star-on', title: '嵌套路由2'}
        }
      ]
    },
  ]
})
