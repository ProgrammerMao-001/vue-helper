// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWeChatTitle from 'vue-wechat-title';
import store from './store';
Vue.use(VueWeChatTitle);
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 在项目中注入路由，让所有的子组件都用于路由属性 $route  $router
  store, // 在项目中注入store,让所有的子组件拥有一个属性  $store 用于和vuex进行通信
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app')

/* main.js: */
/*路由守卫*/
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    // console.log(to, from, next)
    document.title = to.meta.title; // 实时更新title的变化
  }
  next()
})
