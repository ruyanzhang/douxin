const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatRoomSchema = new Schema({
  room_id: Schema.Types.ObjectId, // 聊天室id
  user_id: Schema.Types.ObjectId,
  member_id: {
    type: [Schema.Types.ObjectId],
    required: true
  }, // 成员id
  room_creator: {
    type: Schema.Types.ObjectId,
    required: true
  }, // 群聊创建者id
  type: {
    type: Number, // 0代表一对一， 1代表一对多
    min: 0,
    max: 1,
    required: true
  },
  room_nick: { // 群组昵称
    type: String,
    maxlength: 20
  },
  room_pic: String, // 群组头像
  self_nick: { // 自己在群组昵称
    type: String,
    maxlength: 20
  },
  room_background: String, // 聊天背景
  is_to_top: {
    type: Boolean,
    default: false
  }, // 是否置顶
  is_read: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  updateDate: {
    type: Date,
    default: Date.now()
  }
})

ChatRoomSchema.index({ user_id: 1, updateDate: -1 })

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema, 'chatRoom')

module.exports = ChatRoom
