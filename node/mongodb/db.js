const mongoose = require('mongoose')
const host = process.env.NODE_ENV === 'development'
  ? global.server.dev.dbHost : global.server.product.dbHost
const port = process.env.NODE_ENV === 'development'
  ? global.server.dev.dbPort : global.server.product.dbPort

const dbUrl = `mongodb://${host}:${port}/douxin`

mongoose.connect(dbUrl)

const db = mongoose.connection

db.once('open', () => {
  console.log('连接数据库成功')
})

db.on('error', (error) => {
  console.error(`Error in MongoDb connection: ${error}`)
  mongoose.disconnect()
})

db.on('close', () => {
  console.log('数据库断开，重新连接数据库')
  mongoose.connect(dbUrl)
})
