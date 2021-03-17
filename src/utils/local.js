// 封装保存localstorage token的函数
export function setLocal (val) {
  window.localStorage.setItem('token', val)
}
// 封装获取localstorage token的函数
export function getLocal () {
  // 这里的 return 必须要写，否则将来外界取不到
  return window.localStorage.getItem('token')
}
// 封装删除localstorage token的函数
export function removeLocal () {
  window.localStorage.removeItem('token')
}
// 封装保存localstorage histroy的函数
export function setHistoryLocal (val) {
  window.localStorage.setItem('history', val)
}
// 封装获取localstorage histroy的函数
export function getHistoryLocal () {
  // 这里的 return 必须要写，否则将来外界取不到
  return window.localStorage.getItem('history')
}
// 封装删除localstorage histroy的函数
export function removeHistoryLocal () {
  window.localStorage.removeItem('history')
}
