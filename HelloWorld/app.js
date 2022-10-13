// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var session_id = wx.getStorageSync('session_id')
    this.globalData.session_id = session_id
    console.log(session_id)
  },
  globalData: {
    userInfo: null,
    session_id: null,
  }
})
