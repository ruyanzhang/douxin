<template>
  <div class="login-warp">
    <div>
      <div>
        <nut-textinput
          v-model="userName"
          label="用户名："
          placeholder="请输入用户名"
          @blur="blurUser"
        />
        <p v-if="userNameErrorMessage" class="error-message">
          {{ userNameErrorMessage }}
        </p>
      </div>
      <div>
        <nut-textinput
          v-model="password"
          type="password"
          label="密码："
          placeholder="请输入用户密码"
          class="mt36"
          @blur="blurPassword"
        />
        <p v-if="passwordErrorMessage" class="error-message">
          {{ passwordErrorMessage }}
        </p>
      </div>
      <div class="mt50">
        <nut-button v-if="$wait.waiting('login')" block>
          登录中...
        </nut-button>
        <nut-button v-else block @click="login">
          登录
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script>
import message from '../utils/message.config'
import { setUserId, setToken } from '../utils'
export default {
  components: {
  },
  data () {
    return {
      userName: '',
      password: '',
      userNameErrorMessage: '',
      passwordErrorMessage: ''
    }
  },
  methods: {
    async login () {
      if (!this.userCheck() || !this.passwordCheck()) {
        return
      }
      this.$wait.start('login')
      const userName = this.userName
      const password = this.password
      const data = await this.$store.dispatch('login/login', {
        userName, password
      })
      if (data.status === 200) {
        setToken(data.token)
        setUserId(data.user_id)
        this.$router.push({
          path: '/'
        })
      }
      this.$wait.end('login')
    },
    userCheck () {
      if (this.userName === '') {
        this.userNameErrorMessage = message.errorUserParam
        return false
      } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(this.userName)) {
        this.passwordErrorMessage = message.errorUserFormat
        return false
      }
      this.userNameErrorMessage = ''
      return true
    },
    passwordCheck () {
      if (this.password === '') {
        this.passwordErrorMessage = message.errorPasswordParam
        return false
      } else if (!/^\d{6,10}$/.test(this.password)) {
        this.passwordErrorMessage = message.errorPasswordFormat
        return false
      }
      this.passwordErrorMessage = ''
      return true
    },
    blurUser () {
      this.userCheck()
    },
    blurPassword () {
      this.passwordCheck()
    }
  }
}
</script>

<style scoped lang="less">
  .login-warp{
    padding: 0 30px;
    height: 100vh;
    background: url("~assets/images/logo-bg.png") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    &>div{
      width: 100%;
      margin: auto;
    }
    /deep/ .nut-textinput-label {
      width: 160px;
      display: inline-block;
      text-align: right;
    }
  }
  .error-message {
    color: #ff0000;
    padding-left: 160px;
    font-size: 28px;
  }
</style>
