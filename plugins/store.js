import Vue from 'vue'
export default ({ store, redirect }, inject) => {
  Vue.prototype.$copyStore = store
  Vue.prototype.$redirect = redirect
}
