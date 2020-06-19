import Vue from 'vue'
import { login } from '../services/login'
import { removeToken, removeUserId } from '../utils'
const state = function () {
  return {
  }
}

const getters = {
}

const mutations = {
  logout () {
    removeToken()
    removeUserId()
  }
}

const actions = {
  async login (context, payload = {}) {
    const commit = Vue.prototype.$copyStore.commit
    const data = await login(payload)
    data && data.status === 200 && commit('updateUser', {
      ...data.data,
      token: data.token,
      user_id: data.user_id
    })
    return Promise.resolve(data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
