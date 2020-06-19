import request from '../utils/request'
import config from '../utils/url.config'
const { userLogin, userLogOut, userInfo } = config.api

export async function login (data) {
  return request(userLogin, {
    method: 'post',
    data
  })
}
export async function loginOut (data) {
  return request(userLogOut, {
    method: 'post',
    data
  })
}
export async function getUserInfo (data) {
  return request(userInfo, {
    method: 'get',
    data
  })
}
