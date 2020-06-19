import moment from 'moment'
import { getChatRoom } from '../services/chatRoom'
const state = function () {
  return {
    chatRoom: []
  }
}

const getters = {
  chatRoomData ({ chatRoom }) {
    return chatRoom.map((item) => {
      if (item.type === 0) {
        return {
          ...item,
          last_message: item.last_message || {},
          contact_info: (item.member_info && item.member_info[1]) || {},
          last_send_time: (item.last_message && moment(item.last_message.send_time).format('YYYY-MM-DD')) || ''
        }
      }
    })
  }
}

const mutations = {
  updateChatRoom (state, payload) {
    state.chatRoom = payload || []
  }
}

const actions = {
  async getChatRoom ({ commit }, payload = {}) {
    const data = await getChatRoom(payload)
    data && data.status === 200 && commit('updateChatRoom', data.data)
    return data || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
