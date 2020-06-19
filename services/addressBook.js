import request from '../utils/request'
import config from '../utils/url.config'
const { addressBook } = config.api

export async function getAddressBook (data) {
  return request(addressBook, {
    data
  })
}
