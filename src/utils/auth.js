import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const WindowIdKey = 'Window-Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getWindowId() {
  return Cookies.get(WindowIdKey)
}

export function setWindowId(windowId) {
  return Cookies.set(WindowIdKey, windowId)
}

export function removeWindowId() {
  return Cookies.remove(WindowIdKey)
}
