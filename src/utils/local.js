// 封装保存localstorage的函数
export function setLocal (val) {
  window.localStorage.setItem('token', val)
}
// 封装获取localstorage的函数
export function getLocal (val) {
  window.localStorage.getItem(val)
}
// 封装删除localstorage的函数
export function removeLocal (val) {
  window.localStorage.removeItem(val)
}
