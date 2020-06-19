import { getToken, getUserId } from '../utils'
function getVerifyData ({ req, store }) {
  let token, user_id
  if (process.client) {
    token = getToken() || ''
    user_id = getUserId() || ''
  } else {
    token = store.user && store.user.token
    user_id = store.user && store.user.user_id
  }
  return {
    token, user_id
  }
}
export default getVerifyData
