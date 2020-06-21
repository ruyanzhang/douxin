<template>
  <nut-tabbar
    :tabbar-list="tabList3"
    :bottom="true"
    @tab-switch="tabSwitch3"
  >
  </nut-tabbar>
</template>
<script>
export default {
  data () {
    return {
      tabList3:[
        {
          'tabTitle':'微信',
          'curr':true,
          'icon':'/chatRoom.png',
          'activeIcon':'/chatRoomCur.png'
        },
        {
          'tabTitle':'通信录',
          'curr':false,
          'icon':'/addressBook.png',
          'activeIcon':'/addressBookCur.png'
        }
      ]
    }
  },
  created () {
    const path = this.$route.path
    this.tabList3.forEach((item) => {
      item.curr = false
    })
    if (path === '/') {
      this.tabList3[0].curr = true
    } else if (path === '/addressBook') {
      this.tabList3[1].curr = true
    }
  },
  methods: {
    tabSwitch3 (value, index) {
      if (index === 0) {
        this.$router.push({
          path: '/'
        })
      } else if (index === 1) {
        this.$router.push({
          path: '/addressBook'
        })
      }
    }
  }
}
</script>
<style lang="less">
  .nut-tabbar {
    height: @tab-bar-height;
  }
  .icon-box .icon {
    width: 46px;
    height: 46px
  }
  .tabbar-nav-word {
    font-size: 26px;
  }
</style>
