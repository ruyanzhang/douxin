import http from 'http'
import https from 'https'
import axios from 'axios'
import Vue from 'vue'
import { getToken, getUserId, removeToken, removeUserId } from './index'
const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 10000,
  baseURL: 'http://192.168.2.107:3000/',
  withCredentials: true,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
}
const myAxios = axios.create(config)
myAxios.interceptors.response.use(function (response) {
  const d = response.data || {}
  if (d.status === 403) {
    if (process.client) {
      removeToken()
      removeUserId()
    }
    Vue.prototype.$redirect('/login')
  } else if (d.status !== 200) {
    if (process.client) {
      Vue.prototype.$dialog({
        noOkBtn: true,
        content: d.message,
        cancelBtnTxt: '我知道了'
      })
    } else {
      console.log(d.message)
    }
  }
  return d
}, function (error) {
  console.log(error)
})
function request (url, { method = 'get', data = {} }) {
  const userId = Vue.prototype.$copyStore.state.user &&
                 Vue.prototype.$copyStore.state.user.user_id
  const Token = Vue.prototype.$copyStore.state.user &&
                Vue.prototype.$copyStore.state.user.token
  const user_id = process.client ? getUserId() : userId
  const token = process.client ? getToken() : Token
  if (token) {
    myAxios.defaults.headers['X-XSRF-TOKEN'] = token
  }
  if (method === 'post') {
    return myAxios.post(url, { ...data, user_id, token })
  } else {
    return myAxios.get(url, {
      params: { ...data, user_id, token } || {}
    })
  }
}

export default request
