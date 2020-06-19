<template>
  <div>
    <div class="page-content">
      <div v-for="(item, index) in addressBook" :key="index" class="addressBook-list">
        <div class="addressBook-list-title">{{ item.title }}</div>
        <ul>
          <li
            v-for="(contactUser, contactIndex) in item.list"
            :key="contactIndex"
            @click="() => showInfoPopup(contactUser)"
          >
            <img class="contact-pic" :src="`/user_pic/${contactUser.image}`">
            <div class="contact-name">
              {{ contactUser.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <nut-popup
      v-model="infoPopupShow"
      position="right"
      close-icon-position="top-left"
      :style="{ width: '100%', height: '100%', background: '#f3f2f2' }"
      :overlay="false"
      :closeable="true"
      :destroy-on-close="true"
    >
      <div class="info_top"></div>
      <div class="info-module info-data">
        <img
          class="info-data-pic"
          :src="infoData.image ? `/user_pic/${infoData.image}` : '/user_pic/default.jpg'"
        >
        <div class="info-data-name">
          {{ infoData.name }}
        </div>
      </div>
      <div class="info-module tc" @click="goToChat">
        发消息
      </div>
    </nut-popup>
    <TabBar />
  </div>
</template>

<script>
import TabBar from '~/components/TabBar'
export default {
  components: {
    TabBar
  },
  async fetch (ctx) {
    await ctx.store.dispatch('addressBook/getAddressBook')
  },
  data () {
    return {
      infoPopupShow: false,
      infoData: {}
    }
  },
  computed: {
    addressBook () {
      return this.$store.state.addressBook.addressBook
    }
  },
  methods: {
    showInfoPopup (contactUser) {
      this.infoPopupShow = true
      this.infoData = contactUser || {}
    },
    goToChat () {
      this.$router.push({
        path: '/chatMessage',
        query: {
          room_id: this.infoData.room_id
        }
      })
    }
  },
  head () {
    return {
      title: '通信录'
    }
  }
}
</script>

<style scoped lang="less">
  @pic_size: 70px;
  @info_pic_size: 120px;
  .addressBook-list-title {
    padding: 6px 20px;
    color: rgb(153, 153, 168);
    background: rgb(246, 246, 246);
  }
  .addressBook-list > ul {
    > li {
      padding: @space_tb 0 0  @space_lr;
      display: flex;
      &:last-child {
        .contact-name {
          border-bottom: none;
        }
      }
    }
  }
  .contact-pic {
    width: @pic_size;
    height: @pic_size;
    border-radius: 8px;
  }
  .contact-name {
    margin-left:  @space_lr;
    padding-bottom: @space_tb;
    border-bottom: 1px solid #dddddd;
    flex: 1;
    height: @pic_size;
    line-height: @pic_size;
  }
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
</style>
