// todo desc: vuex的入口文件

/***
 * 公共的部分
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * 自动读取modules文件夹中的vuex模块
 * 不用手动引入和注入
 */

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules
})


/**
 * 手动引入和注入 写法
 * */

// import tabsview from "./modules/tabsview";
// export default new Vuex.Store({
//   modules: {
//     tabsview,
//   }
// })
