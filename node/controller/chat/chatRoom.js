const mongoose = require('mongoose')
const ChatRoomModel = require('../../models/chat/chatRoom')
const message = require('../../utils/message.config')
class ChatRoom {
  async getChatRoom (ctx, next) {
    const user_id = ctx.query.user_id
    if (!user_id) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const ObjectId = mongoose.Types.ObjectId
        const chatRoom = await ChatRoomModel.aggregate([
          {
            $match: { user_id: new ObjectId(user_id) }
          }, // 找出用户id下有通信记录的list
          { $unwind : "$member_id" },
          {
            $lookup: {
              from: 'users',
              localField: 'member_id',
              foreignField: '_id',
              as: 'member_info'
            }
          }, // 关联通信记录中联系人的资料
          { $unwind : "$member_info" },
          {
            $group : {
              _id: {
                room_id: '$room_id',
                user_id: '$user_id',
                type: '$type'
              },
              member_id: {
                $push: '$member_id'
              },
              member_info: {
                $push: '$member_info'
              }
            }
          },
          {
            $project : {
              _id: 0,
              room_id: '$_id.room_id',
              user_id: '$_id.user_id',
              type: '$_id.type',
              member_id: 1,
              member_info: 1
            }
          },
          {
            $lookup: {
              from: 'chatMessage',
              localField: 'room_id',
              foreignField: 'room_id',
              as: 'last_message'
            }
          },
          {
            $project : {
              room_id: 1,
              user_id: 1,
              type: 1,
              member_id: 1,
              member_info: 1,
              last_message: { $slice: ["$last_message", 0, 1] }
            }
          },
          { $unwind : "$last_message" },
          { $sort: { 'last_message.send_time': -1 } }
        ])
        ctx.body = {
          status: 200,
          success: message.successFind,
          data: chatRoom || []
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          message: error.message
        }
      }
    }
  }
}

module.exports = new ChatRoom()
