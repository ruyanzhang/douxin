<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style lang="less">
html,body{
  height: 100%;
  overflow: hidden;
}
body{
  font-size: @baze-size !important;
  min-width: 640px;
  // max-width: 750px;
  margin: 0 auto;
}
li{list-style:none;}
img{max-width: 100%;}
.w-100{width: 100%;}
.tc{text-align: center;}
.tr{text-align: right;}
.ovh{overflow: hidden;}
.fl{float: left;}
.flex{display: flex;}
.flex-ac{align-items:center;}
.flex-jsb{justify-content: space-between;}
.flex-ver{flex-direction: column;}
.flex-wrap{flex-wrap: wrap;}
.flex1{flex: 1;}
.plr10{padding-left: 10px;padding-right: 10px;}
.ptb10{padding-top: 10px;padding-bottom: 10px;}
.pb10{padding-bottom: 10px;}
.mt36{margin-top: 36px;}
.mt50{margin-top: 50px;}
.ml10{margin-left: 5px;}
.mlr-10{margin-left: -10px;margin-right: -10px;}
.bg1{background-color: #f5f5f5;}
.blue{color: @blue-color;}
.border-bottom{border-bottom: 1px solid @border-color}

//page
.page-content {
  height: calc(100vh - @tab-bar-height - @page-top);
  overflow-y: auto;
}

// input
.container {
  .nut-textinput {
    input {
      height: 80px;
      font-size: @baze-size;
    }
    .nut-textinput-clear {
      width: 30px;
      height: 30px;
      right: 20px;
    }
  }
  .nut-button {
    font-size: @baze-size;
    height: 80px;
  }
}
.nut-dialog-wrapper {
  .nut-dialog-content, .nut-dialog-btn {
    font-size: @smaller-baze-size;
  }
  .nut-dialog-body {
    max-height: 600px;
    overflow-y: auto;
  }
  .nut-dialog-footer {
    height: 70px;
  }
}

// tabBar
.tabbar-nav:hover {
  text-decoration: none !important;
}

// popup
.popup-box {
  z-index: 999 !important;
}
</style>
