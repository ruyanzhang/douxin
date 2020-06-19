import request from '../utils/request'
import config from '../utils/url.config'
const { chatRoom } = config.api

export async function getChatRoom (data) {
  return request(chatRoom, {
    data
  })
}
