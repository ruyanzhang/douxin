const Jwt = require('../jwt/jwt')
async function jwToken (ctx, next) {
  const token = ctx.headers['x-xsrf-token']
  const paramToken = (ctx.query && ctx.query.token) ||
                     (ctx.request.body && ctx.request.body.token) // 防止crsf攻击
  if (!token || token !== paramToken) {
    ctx.body = { status: 403, message: '没有合法权限访问此网页' }
  } else {
    const jwt = new Jwt(token)
    const result = jwt.verifyToken()
    if (result === 'err') {
      ctx.body = { status: 403, message: '登录已过期,请重新登录' }
    } else {
      await next()
    }
  }
}
module.exports = jwToken
