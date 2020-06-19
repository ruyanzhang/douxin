const chatMessageModel = require('../../models/chat/chatMessage')
const message = require('../../utils/message.config')
class ChatMessage {
  async getChatMessage (ctx, next) {
    const room_id = ctx.query.room_id
    if (!room_id) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const chatMessage = await chatMessageModel.find({ room_id })
        ctx.body = {
          status: 200,
          success: message.successFind,
          data: chatMessage
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          message: error.message
        }
      }
    }
  }

  async addChatMessage (data) {
    const {
      send_id, room_id, message_type, message_content, send_time, sender_pic
    } = data
    if (!room_id || !message_content || !send_time || !send_id || !sender_pic) {
      return {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        let message
        if (message_type === 1) {
          message = await chatMessageModel.create({
            room_id,
            message_type,
            message_content,
            send_time,
            send_id,
            sender_pic
          })
        } else {
          return {
            status: 0,
            message: message.errorParam
          }
        }
        if (message) {
          return {
            status: 200,
            success: message.successAdd,
            data: message
          }
        }
      } catch (error) {
        return {
          status: 0,
          message: error.message
        }
      }
    }
  }
}

module.exports = new ChatMessage()
