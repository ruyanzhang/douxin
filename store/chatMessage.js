import { getChatMessage } from '../services/chatMessage'
const state = function () {
  return {
    chatMessage: []
  }
}

const getters = {
}

const mutations = {
  updateChatMessage (state, payload) {
    state.chatMessage = payload || []
  },
  addChatMessage (state, payload) {
    state.chatMessage.push(payload)
  }
}

const actions = {
  async getChatMessage ({ commit }, payload = {}) {
    const data = await getChatMessage(payload)
    data && data.status === 200 && commit('updateChatMessage', data.data)
    return data || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
