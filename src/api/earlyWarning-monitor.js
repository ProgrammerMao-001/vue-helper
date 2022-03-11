import request from '@/utils/request';
const baseUrl = 'https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper';

// 隐患类型的 el-select
export function getTypeChecklist () {
  return request({
    url: baseUrl + '/monitor/type-checklist',
    method: 'get'
  })
}
