/**
 * @ type {import('@vue/cli-service').ProjectOptions}
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
