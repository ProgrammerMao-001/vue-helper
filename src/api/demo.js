import request from '@/utils/request';

/*
 * 首页的数据
 */

// getMethod
export function getMethod(parms) {
  return request({
    url: '/getMethod',
    method: 'get',
    params: parms
  })
}

// putMethod(更新)
export function putMethod(data) {
  return request({
    url: '/putMethod',
    method: 'put',
    data: data
  })
}

// postMethod (保存)
export const postMethod = (data) => {
  return request({
    url: 'postMethod',
    method: 'post',
    data: data
  })
}

// deleteMethod (删除)
export const deleteMethod = (id) => {
  return request({
    url: '/deleteMethod/' + id,
    method: 'delete'
  })
}

