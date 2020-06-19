import Vue from 'vue'
import Scoket from 'vue-socket.io'
// const host = process.env.NODE_ENV === 'development'
//   ? global.server.dev.host : global.server.product.host
// const port = process.env.NODE_ENV === 'development'
//   ? global.server.dev.port : global.server.product.port
Vue.use(new Scoket({
  debug: true,
  connection: 'http://192.168.2.107:3000/'
}))
