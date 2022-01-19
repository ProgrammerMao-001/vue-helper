import request from '@/utils/request';
const baseUrl = 'https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper';

/*
 * 首页的数据
 */

// 侧边栏菜单列表 (shaoxing)
// export function sideBarList () {
//   return request({
//     url: baseUrl + '/side-bar',
//     method: 'get',
//   })
// }

// 侧边栏菜单列表 (jainshu)
export function sideBarListJianShu () {
  return request({
    url: baseUrl + '/side-bar/jianshu',
    method: 'get'
  })
}

// 顶部栏的搜索数据
export function topBarSearch () {
  return request({
    url: baseUrl + '/top-bar-search',
    method: 'get'
  })
}

