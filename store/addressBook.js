import { getAddressBook } from '../services/addressBook'
const state = function () {
  return {
    addressBook: []
  }
}

const getters = {
}

const mutations = {
  updateAddressBook (state, payload) {
    state.addressBook = payload || []
  }
}

const actions = {
  async getAddressBook ({ commit }, payload = {}) {
    const data = await getAddressBook(payload)
    data && data.status === 200 && commit('updateAddressBook', data.data)
    return data || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
