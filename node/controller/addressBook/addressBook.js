const mongoose = require('mongoose')
const pinyin = require('pinyin')
const addressBookModel = require('../../models/addressBook/addressBook')
const usersModel = require('../../models/users/users')
const chatMessageModel = require('../../models/chat/chatMessage')
const ChatRoomModel = require('../../models/chat/chatRoom')
const message = require('../../utils/message.config')
class AddressBook {
  deepCall (arr) {
    return arr.reduce((newArr, item) => newArr.concat(Array.isArray(item) ? this.deepCall(item) : item),[])
  }

  changePinYin (str) {
    if (typeof str !== 'string') {
      return ''
    }
    return this.deepCall(pinyin(str)).join('').toUpperCase() || ''
  }

  addressBookSort (addressBook) {
    return addressBook.map((item) => {
      return {
        ...item,
        'contact_info': (item.contact_info.length > 0 && item.contact_info[0]) || {},
        'contact_name_pinyin': this.changePinYin(item.contact_name) || ''
      }
    }).sort((a, b) => {
      return a.contact_name_pinyin > b.contact_name_pinyin
    })
  }

  getAddressBookList (addressBook) {
    const addressBookData = []
    addressBook.forEach((item) => {
      const firstLetter = item.contact_name_pinyin.charAt(0)
      const index = addressBookData.findIndex((item) => {
        return item.title === firstLetter
      })
      const contact_data = {
        username: item.contact_info.username,
        user_pic: item.contact_info.user_pic,
        contact_id: item.contact_id,
        room_id: item.room_id
      }
      if (index > -1) {
        addressBookData[index].list.push(contact_data)
      } else {
        addressBookData.push({
          title: firstLetter,
          list: [contact_data]
        })
      }
    })
    return addressBookData
  }

  async getAddressBook (ctx, next) {
    const user_id = ctx.query.user_id
    if (!user_id) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const ObjectId = mongoose.Types.ObjectId
        const addressBook = await addressBookModel.aggregate([
          {
            $match: { user_id: new ObjectId(user_id) }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'contact_id',
              foreignField: '_id',
              as: 'contact_info'
            }
          }
        ])
        const addressBookSort = addressBook.length > 0 && this.addressBookSort(addressBook)
        const addressBookList = addressBook.length > 0 && this.getAddressBookList(addressBookSort)
        ctx.body = {
          status: 200,
          success: message.successFind,
          data: addressBook.length > 0 ? addressBookList : []
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          message: error.message
        }
      }
    }
  }

  async getFriend (ctx, next) {
    const tel = ctx.query.tel
    const user_id = ctx.query.user_id
    if (!tel) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const userInfo = await usersModel.aggregate([
          {
            $match: { tel }
          },
          {
            $project: {
              username: 1,
              sex: 1,
              tel: 1,
              user_pic: 1
            }
          }
        ])
        if (userInfo && userInfo.length === 0) {
          ctx.body = {
            status: 0,
            message: message.noData
          }
        } else {
          const contactInfo = await addressBookModel.findOne({
            user_id,
            contact_id: userInfo[0]._id
          })
          userInfo[0].isFriend = !!contactInfo
          if (contactInfo) {
            userInfo[0].room_id = contactInfo.room_id
          }
          ctx.body = {
            status: 200,
            success: message.successFind,
            data: userInfo[0] || {}
          }
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          message: error.message
        }
      }
    }
  }

  async addFriend (ctx, next) {
    const user_id = ctx.request.body.user_id
    const contact_id = ctx.request.body.contact_id
    const contact_name = ctx.request.body.contact_name
    const user_name = ctx.request.body.user_name
    const user_pic = ctx.request.body.user_pic
    if (!user_id || !contact_id) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const room_id = mongoose.Types.ObjectId()
        await addressBookModel.create({
          user_id, contact_id, contact_name, room_id, group: '朋友'
        })
        await addressBookModel.create({
          user_id: contact_id, contact_id: user_id, contact_name: user_name, room_id, group: '朋友'
        })
        await ChatRoomModel.create({
          room_id, user_id, member_id: [user_id, contact_id], room_creator: user_id
        })
        await ChatRoomModel.create({
          room_id, user_id: contact_id, member_id: [contact_id, user_id], room_creator: user_id
        })
        await chatMessageModel.create({
          room_id,
          message_type: 1,
          message_content: message.firstChat,
          send_id: user_id,
          sender_pic: user_pic
        })
        ctx.body = {
          status: 200,
          message: message.successAdd,
          data: {
            room_id
          }
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

module.exports = new AddressBook()
