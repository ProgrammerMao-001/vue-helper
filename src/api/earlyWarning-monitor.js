import request from '@/utils/request';
// import id from "element-ui/src/locale/lang/id";

const baseUrl = 'https://www.fastmock.site/mock/c25e396c1d2ef07e8f1fc0acf0adc1a5/vue-helper'; // fastmock 上的地址
const serverUrl = 'https://kpgl.yjj.sx.gov.cn:8867/api'; // 线上地址
const localUrl = 'http://192.168.2.222:10010'; // 本地地址

// 隐患类型的 el-select
export function getTypeChecklist() {
  return request({
    url: baseUrl + '/monitor/type-checklist',
    // url: serverUrl + '/open/inspect/submitted/standard/type-checklist',
    method: 'get'
  })
}

// 工况领域企业安全隐患表格的数据
export function getPcList(opts) {
  // const url = baseUrl + '/monitor/pc-list'; // 无分页
  // const url = serverUrl + '/open/inspect/submitted/standard/pc-list';
  const url = localUrl + '/open/inspect/submitted/standard/pc-list';
  return request.get(url, {
    params: opts,
  })
}

// 弹窗的行业下拉数据
export function getIndustry() {
  return request({
    url: baseUrl + '/open/inspect/submitted/standard/industry',
    // url: serverUrl + '/open/inspect/submitted/standard/industry',
    // url: localUrl + '/open/inspect/submitted/standard/industry',
    method: 'get',
  })
}

// http://192.168.2.222:10010/open/inspect/submitted/standard/1476830969796890626
// 详情的接口
export function getDetail(id) {
  return request({
    // url: serverUrl + '/open/inspect/submitted/standard/' + id,
    url: localUrl + '/open/inspect/submitted/standard/' + id,
    method: 'get',
  })
}

// http://192.168.2.222:10010/open/inspect/submitted/standard/pc-add
// 新增的接口
export function pcAdd(opts) {
  const url = localUrl + '/open/inspect/submitted/standard/pc-add';
  return request.post(url, opts)
}

// http://192.168.2.222:10010/open/inspect/submitted/standard/pc-update
// 编辑的接口
export function pcUpdate(opts) {
  const url = localUrl + '/open/inspect/submitted/standard/pc-update';
  return request.post(url, opts)
}


// http://192.168.2.222:10010/open/inspect/submitted/standard/pc-delete/1503645968894435329
// 删除的接口
export function pcDelete(id) {
  const url = localUrl + '/open/inspect/submitted/standard/pc-delete/' + id;
  return request.delete(url)
}

