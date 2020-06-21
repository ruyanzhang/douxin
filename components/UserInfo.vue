<template>
  <div class="user-info">
    <div class="info_top"></div>
    <div class="info-module info-data">
      <img
        class="info-data-pic"
        :src="infoData.user_pic ? `/user_pic/${infoData.user_pic}` : '/user_pic/default.jpg'"
      >
      <div class="info-data-name">
        {{ infoData.username }}
      </div>
    </div>
    <div v-if="type === 'sendMessage' || infoData.isFriend" class="info-module tc" @click="goToChat">
      发消息
    </div>
    <div v-else class="info-module tc" @click="addFriend">
      添加到通信录
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoData: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default: 'sendMessage'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    goToChat () {
      const contact_name = this.infoData.username
      this.$router.push({
        path: '/chatMessage',
        query: {
          room_id: this.infoData.room_id,
          contact_name
        }
      })
    },
    async addFriend () {
      const user_name = this.user.username
      const user_id = this.user.user_id
      const user_pic = this.user.user_pic
      const contact_name = this.infoData.username
      const contact_id = this.infoData._id
      const data = await this.$store.dispatch('addressBook/addFriend', {
        user_name, user_id, contact_name, contact_id, user_pic
      })
      if (data && data.data && data.status === 200) {
        const room_id = data.data.room_id
        this.$router.push({
          path: '/chatMessage',
          query: {
            room_id
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
  @info_pic_size: 120px;
  .info_top {
    height: 60px;
    background-color: #ffffff;
  }
  .info-module {
    background-color: #ffffff;
    margin-bottom: @space_tb;
    padding: 24px @space_lr;
  }
  .info-data {
    display: flex;
  }
  .info-data-pic {
    width: @info_pic_size;
    height: @info_pic_size;
    border-radius: 12px;
  }
  .info-data-name {
    margin-left: 30px;
    font-size: 40px;
  }
  .user-info {
    width: 100vw;
    height: 100vh;
    background-color: #f3f2f2;
  }
</style>
