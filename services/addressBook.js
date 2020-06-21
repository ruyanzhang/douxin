import request from '../utils/request'
import config from '../utils/url.config'
const { addressBook, friend, addFriendUrl } = config.api

export async function getAddressBook (data) {
  return request(addressBook, {
    data
  })
}

export async function getFriend (data) {
  return request(friend, {
    data
  })
}

export async function addFriend (data) {
  return request(addFriendUrl, {
    method: 'post',
    data
  })
}
