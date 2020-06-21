// const host = process.env.HOST || '127.0.0.1'
// const port = process.env.PORT || 3000
const APIV1 = 'api'
export default {
  name: '',
  prefix: '',
  footerText: '',
  logoSrc: '',
  logoText: '',
  needLogin: true,
  api: {
    userLogin: `${APIV1}/login`, // 登入
    userLogOut: `${APIV1}/loginOut`, // 登出
    userInfo: `${APIV1}/user`, // 获取用户信息
    addressBook: `${APIV1}/addressBook`, // 通信录
    chatMessage: `${APIV1}/chat/chatMessage`, // 聊天记录
    chatRoom: `${APIV1}/chat/chatRoom`, // 聊天室list
    friend: `${APIV1}/addressBook/getFriend`, // 查找朋友
    addFriendUrl: `${APIV1}/addressBook/addFriend`, // 添加朋友
    mistakeListUrl: `${APIV1}/teacher/mistake_list`
  }
}
