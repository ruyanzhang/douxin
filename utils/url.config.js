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
    mistakeListUrl: `${APIV1}/teacher/mistake_list`
  }
}
