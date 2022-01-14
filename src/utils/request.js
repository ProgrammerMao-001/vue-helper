// axios数据请求封装
import axios from "axios";
// todo 创建一个实例
const server = axios.create({
  timeout: 5000,
})
// const baseUrl = "https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper"
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 请求前
server.interceptors.request.use((config) => config);
// 请求前错误
server.interceptors.request.eject((config) => {
  return config;
});
// 请求成功后
server.interceptors.response.use((config) => {
  return config;
});
// 请求后失败
server.interceptors.response.eject((config) => {
  return config;
})

// const RequestServer = {
//   test: () => {
//     return server.get(baseUrl + "/side-bar");
//   }
// }

export default server;
