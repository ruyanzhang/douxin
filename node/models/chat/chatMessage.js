const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatMessageSchema = new Schema({
  room_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message_type: {
    type: Number, // 1:文字 2:图片
    required: true
  },
  message_content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5000
  },
  send_time: {
    type: Date,
    required: true,
    default: Date.now()
  },
  send_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  sender_pic: {
    type: String,
    required: true
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

ChatMessageSchema.index({ room_id: 1, send_time: -1 })

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema, 'chatMessage')

module.exports = ChatMessage
