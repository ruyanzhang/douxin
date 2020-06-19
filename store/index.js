import { cookieToJson } from '../utils'
import { getUserInfo } from '../services/login'
const state = function () {
  return {
    user: {}
  }
}

const getters = {
}

const mutations = {
  updateUser (state, payload) {
    state.user = { ...state.user, ...payload } || {}
  }
}

const actions = {
  async nuxtServerInit ({ commit }, { req, redirect }) {
    if (req.url !== '/login') {
      const cookie = req.headers && req.headers.cookie
      const cookieParse = cookie && cookieToJson(cookie)
      const token = (cookieParse && cookieParse['XSRF-TOKEN']) || ''
      const user_id = (cookieParse && cookieParse['USER-ID']) || ''
      commit('updateUser', { token, user_id })
      const data = await getUserInfo({ token, user_id })
      if (data && data.status === 200) {
        commit('updateUser', { ...data.data || {} })
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
