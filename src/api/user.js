import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v2/token/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/v2/token/get-info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
// 用户列表
export function userListApi(data) {
  return request({
    url: '/v2/admin/list',
    method: 'post',
    data
  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: '/v2/admin/create',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: '/v1/admin/delete',
    method: 'post',
    data
  })
}

// 角色列表
export function roleListApi(data) {
  return request({
    url: '/v2/role/list',
    method: 'post',
    data
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: '/v2/role/create',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteRole(data) {
  return request({
    url: '/v2/role/delete',
    method: 'post',
    data
  })
}