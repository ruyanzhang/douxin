# douxin
## 须知
* 项目是一个仿微信的聊天程序，当中用到nuxt服务端渲染（这种业务可能不需要用到服务端渲染，纯碎是个人想实践（折腾）一下nuxt）
* 项目中暂时只实现一些聊天基本业务功能，如登录页（有token验证），聊天记录（通过websoket来推送消息），通信录等，以后可能会继续扩展
* 后端语言是node，数据库是mongodb

## 安装

```bash
# install dep
npm i

# for dev
npm run dev

# for look
1,数据库名称：douxin，初始数据在initData文件夹，格式为json，具体导入操作可查看mongodb教程
2,所有域名，端口，数据地址等等，都通过global.config.js文件设置


```

## 视图
<img src="https://wx3.sinaimg.cn/mw690/bf3f3429gy1gg0oevs0bnj20d10n6q2y.jpg" width="24%"><img src="https://wx1.sinaimg.cn/mw690/bf3f3429gy1gg0oevl2c6j20d10n6mzu.jpg" width="24%"><img src="https://wx3.sinaimg.cn/mw690/bf3f3429gy1gg0oevlgwrj20d10n6myd.jpg" width="24%"><img src="https://wx4.sinaimg.cn/mw690/bf3f3429gy1gg0oevsdj9j20d10n6q5h.jpg" width="24%">