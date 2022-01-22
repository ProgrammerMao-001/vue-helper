// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';

Vue.use(ElementUI);

import 'element-ui/lib/theme-chalk/index.css';

import VueWeChatTitle from 'vue-wechat-title'; // desc 动态改变 title 的插件

Vue.use(VueWeChatTitle);

import store from './store';
import '@/styles/public.scss'; // todo make global.css

import AMap from 'vue-amap'; // todo load GaoDe map positioning module
Vue.use(AMap);

import VueAMap from 'vue-amap';

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'f7c57214e1d8b5756dcfc2eac8c0e713',
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.AMapManager', 'AMap.Geolocation'],
  v: '1.4.4',
  uiVersion: '1.0.11'
});

Vue.config.productionTip = false

/**
 * 初始化vue-map
 * */
AMap.initAMapApiLoader({
  // key: '49dc9e18f2999a3cf571cdbe7807a2f0',  // anDun
  // key: 'd4332e5adb8b584442266763d20b978c',  // 高德key
  plugin: ['AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'Geocoder'], // plugin 所要用到的模块功能插件的集合，按需添加
  v: '1.4.4',//高德 sdk 版本为 1.4.4
  uiVersion: '1.0.11',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 在项目中注入路由，让所有的子组件都用于路由属性 $route  $router
  store, // 在项目中注入store,让所有的子组件拥有一个属性  $store 用于和vuex进行通信
  components: {App},
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
