const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    match: /^[^0-9][a-zA-Z0-9\u4e00-\u9fa5]+$/
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  sex: {
    type: String,
    enum: ['男', '女']
  },
  tel: {
    type: String,
    required: true,
    match: /^1[3456789]\d{9}$/
  },
  user_pic: String,
  createDate: {
    type: Date,
    default: Date.now()
  },
  updateDate: {
    type: Date,
    default: Date.now()
  }
})

UsersSchema.index({ createDate: -1 })

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users
