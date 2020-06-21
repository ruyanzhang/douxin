const crypto = require('crypto')
const usersModel = require('../../models/users/users')
const Jwt = require('../../jwt/jwt')
const message = require('../../utils/message.config')
const expires = 10 // 分钟
class Users {
  cryptoMd5 (password) {
    const md5 = crypto.createHash('md5')
    return md5.update(password).digest('hex')
  }

  async getUserInfo (ctx, next) {
    const user_id = ctx.query.user_id
    if (!user_id) {
      ctx.body = {
        status: 0,
        message: message.errorParam
      }
    } else {
      try {
        const user = await usersModel.findOne({ _id: user_id })
        ctx.body = {
          status: 200,
          success: message.successFind,
          data: user
        }
      } catch (error) {
        ctx.body = {
          status: 0,
          message: error.message
        }
      }
    }
  }

  async login (ctx, next) {
    const username = ctx.request.body.userName
    const password = ctx.request.body.password
    const newPassword = this.cryptoMd5(password)
    try {
      if (!username) {
        throw new Error(message.errorUserParam)
      } else if (!password) {
        throw new Error(message.errorPasswordParam)
      }
    } catch (error) {
      ctx.body = {
        status: 0,
        message: error.message
      }
      return
    }
    try {
      const users = await usersModel.findOne({ username })
      if (!users) {
        throw new Error(message.userNull)
      } else if (users.password.toString() !== newPassword.toString()) {
        throw new Error(message.errorPassword)
      }
      const jwt = new Jwt(users._id, expires)
      const token = jwt.generateToken() || ''
      ctx.cookies.set('XSRF-TOKEN', '', { maxAge: 0 })
      ctx.cookies.set('USER-ID', '', { maxAge: 0 })
      ctx.cookies.set('XSRF-TOKEN', token, {
        maxAge: expires * 60 * 1000
      })
      ctx.cookies.set('USER-ID', users._id, {
        maxAge: expires * 60 * 1000
      })
      users.password = ''
      ctx.body = {
        status: 200,
        success: message.successLogin,
        data: users,
        token,
        user_id: users._id
      }
    } catch (error) {
      ctx.body = {
        status: 0,
        message: error.message
      }
    }
  }
}

module.exports = new Users()
