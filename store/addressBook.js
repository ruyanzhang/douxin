import { getAddressBook, getFriend, addFriend } from '../services/addressBook'
const state = function () {
  return {
    addressBook: [],
    friend: {}
  }
}

const getters = {
}

const mutations = {
  updateAddressBook (state, payload) {
    state.addressBook = payload || []
  },
  updateFriend (state, payload) {
    state.friend = payload || {}
  }
}

const actions = {
  async getAddressBook ({ commit }, payload = {}) {
    const data = await getAddressBook(payload)
    data && data.status === 200 && commit('updateAddressBook', data.data)
    return data || {}
  },
  async getFriend ({ commit }, payload = {}) {
    const data = await getFriend(payload)
    data && data.status === 200 && commit('updateFriend', data.data)
    return data || {}
  },
  async addFriend ({ commit }, payload = {}) {
    const data = await addFriend(payload)
    return data || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
