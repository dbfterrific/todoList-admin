import request from '@/utils/request'

// 创建窗口
export function windowCreateApi(data) {
  return request({
    url: '/v2/window/create',
    method: 'post',
    data
  })
}
// 窗口列表
export function windowListApi(data) {
  return request({
    url: '/v2/window/list',
    method: 'post',
    data
  })
}
// 删除窗口
export function windowDeleteApi(data) {
  return request({
    url: '/v2/window/delete',
    method: 'post',
    data
  })
}

// 创建业务
export function businessCreateApi(data) {
  return request({
    url: '/v2/business/create',
    method: 'post',
    data
  })
}
// 业务列表
export function businessListApi(data) {
  return request({
    url: '/v2/business/list',
    method: 'post',
    data
  })
}
// 删除业务
export function businessDeleteApi(data) {
  return request({
    url: '/v2/business/delete',
    method: 'post',
    data
  })
}

// 订单列表
export function orderListApi(data) {
  return request({
    url: '/v2/order/list',
    method: 'post',
    data
  })
}
// 订单叫号
export function orderCallApi(data) {
  return request({
    url: '/v2/order/call',
    method: 'post',
    data
  })
}
// 审核通过
export function auditPassApi(data) {
  return request({
    url: '/v2/audit/pass',
    method: 'post',
    data
  })
}
// 审核列表
export function auditListApi(data) {
  return request({
    url: '/v2/audit/list',
    method: 'post',
    data
  })
}
// 审核拒绝
export function auditRejectApi(data) {
  return request({
    url: '/v2/audit/reject',
    method: 'post',
    data
  })
}

// 审核拒绝
export function qrCodeApi(data) {
  return request({
    url: '/v1/token/qr',
    method: 'post',
    data
  })
}

// 队列列表
export function queueApi(data) {
  return request({
    url: '/v2/order/queue',
    method: 'post',
    data
  })
}

// 员工单日完成业务量
export function userDataApi(data) {
  return request({
    url: '/v2/stat/user',
    method: 'post',
    data
  })
}

// 业务量
export function eventDataApi(data) {
  return request({
    url: '/v2/stat/order',
    method: 'post',
    data
  })
}

// 获取设置预约期限
export function getDateApi(data) {
  return request({
    url: '/v2/config/get-date-config',
    method: 'post',
    data
  })
}
// 设置预约期限
export function setDataApi(data) {
  return request({
    url: '/v2/config/set-date-config',
    method: 'post',
    data
  })
}
