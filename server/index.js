// 设置server全局变量
require('../global.config.js')
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const users = require('../node/routes/users')
const addressBook = require('../node/routes/addressBook')
const chat = require('../node/routes/chat')
const ChatMessageModel = require('../node/controller/chat/chatMessage')
const app = new Koa()
const router = new Router()

// 启动服务器
require('../node/mongodb/db.js')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyParser())

  // io
  const user = {}
  const server = require('http').createServer(app.callback())
  const io = require('socket.io')(server)
  io.sockets.on('connection', (socket) => {
    // console.log('连接成功', { id: socket.id })
    socket.on('signIn', (username) => {
      user[username] = socket.id
    })
    socket.on('addMessage', async (to, data) => {
      if (!to || !data) {
        return
      }
      const d = await ChatMessageModel.addChatMessage(data)
      user[to] && io.sockets.connected[user[to]].emit('getMessage', d || {})
      io.sockets.connected[socket.id].emit('getMessage', d || {})
    })
    socket.on('disconnect', () => {
      console.log('chatMessage disconnected')
    })
  })

  // api
  router.use('/api', users)
  router.use('/api', addressBook)
  router.use('/api', chat)

  // 前端页面
  app.use(async (ctx, next) => {
    await next()
    if (ctx.status === 404) {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
    }
  })

  // 启动路由
  app.use(router.routes())
  app.use(router.allowedMethods())

  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
