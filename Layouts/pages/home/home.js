// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tl_loading: false,
    scanResult: '',
  },

  // Show toast
  handleShowToastButton(evt) {
    wx.showToast({
      title: '已发送',
      icon: 'success',
      duration: 1500,
    })
  },

  // Show modal
  // 详细参数：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html
  handleShowModalButton(evt) {
    wx.showModal({
      title: '普通提示弹框Modal',
      content: '告知当前状态，信息和解决方法',
      cancelColor: '#000000',
    })
  },

  // 登录测试
  loginTest() {
    console.log('login')
    wx.login({
      timeout: 100000,
      success: function(res) {
        // 成功获取用户登录凭证
        if(res.code) {
          console.log('用户登录凭证' + res.code)




        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 扫码测试
  scanTest() {
    var that = this
    wx.scanCode({
      success: function(res) {
        console.log(res.result)
        that.setData({
          scanResult: res.result
        })
      }

    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    console.log(app.globalData.testGlobal)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      tl_loading: true
    })
    console.log('Refreshing...')
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: (res) => {
          console.log('Finished!')
          this.setData({
            tl_loading: false
          })
        },
      })
    }, 3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})