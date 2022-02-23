/**
 * @ type {import('@vue/cli-service').ProjectOptions}
 * https://cli.vuejs.org/zh/config/#devserver-proxy // 配置反向代理
 * 在 dev 开发模式下可以下使用 webpack 的 proxy
 * 但这种方法在生产环境是不能使用的。在生产环境中需要使用 nginx 进行反向代理。
 * 不管是 proxy 和 nginx 的原理都是一样的，通过搭建一个中转服务器来转发请求规避跨域的问题。
 */
module.exports = {
  devServer: {
    port: "5200", // todo 设置端口号
    proxy: {
      "/api": {
        // target: "https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper",
        target: "https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}
