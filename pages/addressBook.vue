<template>
  <div>
    <Header />
    <div class="page-content">
      <div class="contact-item-list">
        <div class="contact-item">
          <img class="contact-pic" :src="`/user_pic/default.jpg`">
          <div class="contact-name">新的朋友</div>
        </div>
      </div>
      <div v-for="(item, index) in addressBook" :key="index" class="addressBook-list">
        <div class="addressBook-list-title">{{ item.title }}</div>
        <ul class="contact-item-list">
          <li
            v-for="(contactUser, contactIndex) in item.list"
            :key="contactIndex"
            class="contact-item"
            @click="() => showInfoPopup(contactUser)"
          >
            <img class="contact-pic" :src="`/user_pic/${contactUser.user_pic}`">
            <div class="contact-name">
              {{ contactUser.username }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <nut-popup
      v-model="infoPopupShow"
      position="right"
      close-icon-position="top-left"
      :overlay="false"
      :closeable="true"
      :destroy-on-close="true"
    >
      <UserInfo :infoData="infoData" />
    </nut-popup>
    <TabBar />
  </div>
</template>

<script>
import Header from '~/components/Header'
import TabBar from '~/components/TabBar'
import UserInfo from '~/components/UserInfo'
export default {
  components: {
    TabBar, UserInfo, Header
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
  .addressBook-list-title {
    padding: 6px 20px;
    color: rgb(153, 153, 168);
    background: rgb(246, 246, 246);
  }
  .contact-item-list {
    & > .contact-item {
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
</style>
