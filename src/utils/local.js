// 封装保存localstorage的函数
export function setLocal (val) {
  window.localStorage.setItem('token', val)
}
// 封装获取localstorage的函数
export function getLocal () {
  // 这里的 return 必须要写，否则将来外界取不到
  return window.localStorage.getItem('token')
}
// 封装删除localstorage的函数
export function removeLocal () {
  window.localStorage.removeItem('token')
}
