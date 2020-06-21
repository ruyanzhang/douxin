<template>
  <div class="header">
    <div>微信</div>
    <img src="/add.png" @click="showNav" />
    <nut-popup
      v-model="isNavShow"
      position="right"
      class="header-nav"
    >
      <div class="nav-item" @click="showSearchFriend"><img src="/add_friend.png" />添加朋友</div>
    </nut-popup>
    <nut-popup
      v-model="isSearchShow"
      close-icon-position="top-left"
      position="right"
      :overlay="false"
      :closeable="true"
      :destroy-on-close="true"
      class="search-friend"
    >
      <div class="search-friend-input">
        <nut-textinput
          v-model="searchValue"
          class="search-input"
          type="search"
          placeholder="请输入手机号"
        />
        <nut-button v-if="$wait.waiting('getFriend')">搜索中...</nut-button>
        <nut-button v-else @click="searchFriend">搜索</nut-button>
      </div>
    </nut-popup>
    <nut-popup
      v-model="infoPopupShow"
      position="right"
      close-icon-position="top-left"
      :overlay="false"
      :closeable="true"
      :destroy-on-close="true"
    >
      <UserInfo :infoData="infoData" type="addFriend" />
    </nut-popup>
  </div>
</template>
<script>
import UserInfo from '~/components/UserInfo'
export default {
  components: {
    UserInfo
  },
  data () {
    return {
      isNavShow: false,
      isSearchShow: false,
      infoPopupShow: false,
      searchValue: ''
    }
  },
  computed: {
    infoData () {
      return this.$store.state.addressBook.friend
    }
  },
  methods: {
    showNav () {
      this.isNavShow = true
    },
    showSearchFriend () {
      this.isNavShow = false
      this.isSearchShow = true
    },
    async searchFriend () {
      if (!this.searchValue) {
        return
      }
      this.$wait.start('getFriend')
      const data = await this.$store.dispatch('addressBook/getFriend', {
        tel: this.searchValue
      })
      this.searchValue = ''
      this.$wait.end('getFriend')
      if (data && data.status === 200) {
        this.isSearchShow = false
        this.infoPopupShow = true
      }
    }
  }
}
</script>
<style scoped lang="less">
  .header {
    height: 80px;
    background: #f4f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @space_lr;
    & > img {
      width: 46px;
      height: 46px;
    }
  }
  .header-nav {
    height: calc(100vh - @tab-bar-height);
  }
  .nav-item {
    height: 80px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    & > img {
      width: 46px;
      height: 46px;
      margin-right: 24px;
    }
  }
  .search-friend {
    height: 100vh;
    width: 100vw;
  }
  .search-friend-input {
    margin-top: 80px;
    padding: 0 @space_lr;
    display: flex;
    .search-input {
      flex: 1
    }
  }
</style>
