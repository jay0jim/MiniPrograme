// app.js


App({
  onLaunch(options) {
    this.onShareAppMessage()
  },

  globalData: {
    userInfo: null,

  },

  onShareAppMessage() {
    wx.onAppRoute(() => {
      console.log('当前页面路由发生变化 触发该事件onShareAppMessage')
      const pages = getCurrentPages() //获取加载的页面
      const view = pages[pages.length - 1] //获取当前页面的对象
      let route = view.route
      //需要单独写分享方法的页面
      let noGlobalSharePages = []
      //如果页面路由属于单独分享数组里面的页面，则return
      if (noGlobalSharePages.includes(view.route)) return;
      if (!view) return false //如果不存在页面对象 则返回
      view.onShareAppMessage = () => { //重写分享配置
        return {
          title: '快来加入我的活动吧！',
          imageUrl: '/icons/kiwi_avatar.png',
          path: '/pages/launch/launch?from=/' + route //点击分享链接进入指定页面
        }
      }
    })
  },
})