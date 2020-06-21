import Vue from 'vue'
import Scoket from 'vue-socket.io'
Vue.use(new Scoket({
  debug: true,
  connection: process.serverUrl
}))
