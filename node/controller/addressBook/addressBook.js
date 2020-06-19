const mongoose = require('mongoose')
const pinyin = require('pinyin')
const addressBookModel = require('../../models/addressBook/addressBook')
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
        name: item.contact_info.username,
        image: item.contact_info.user_pic,
        id: item.contact_id,
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
}

module.exports = new AddressBook()
