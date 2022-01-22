// todo 存放 system文件夹下的所有接口
import request from '@/utils/request';
const baseUrl = 'https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper';
const baseUrl1 = 'https://elm.cangdu.org';


export function roleTableAll() {
  return request({
    url: baseUrl1 + '/v1/users/list',
    method: 'get'
  })
}


export function DataAll(a, b) {
  return request({
    url: baseUrl1 + '/v1/users/list?offset=' + a + '&limit=' + b,
    method: 'get'
  })
}

// https://elm.cangdu.org/v1/users/list?offset=120&limit=20

export function getRoleData() {
  return request({
    url: baseUrl + '/role-data',
    method: 'get'
  })
}
