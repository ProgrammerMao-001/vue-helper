import request from '@/utils/request';
const baseUrl = "https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper";

/*
 * 首页的数据
 */

// 侧边栏菜单列表
export function sideBarList() {
  return request({
    url: baseUrl + '/side-bar',
    method: 'get',
  })
}
