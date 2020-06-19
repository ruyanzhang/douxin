import request from '../utils/request'
import config from '../utils/url.config'
const { chatMessage } = config.api

export async function getChatMessage (data) {
  return request(chatMessage, {
    data
  })
}
