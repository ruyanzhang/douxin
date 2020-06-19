const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressBookSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  group: String,
  contact_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  room_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  updateDate: {
    type: Date,
    default: Date.now()
  }
})

AddressBookSchema.index({ user_id: 1, group: 1 })

const AddressBook = mongoose.model('AddressBook', AddressBookSchema, 'addressBook')

module.exports = AddressBook
