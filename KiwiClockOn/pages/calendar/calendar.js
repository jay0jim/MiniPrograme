// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    crimsonTop: wx.getSystemInfoSync().windowHeight,
    display: false,
    activeIndex: 0,
  },

  onSegmentClick(e) {
    console.log(e.detail.index)
    var index = e.detail.index
    this.setData({
      activeIndex: index
    })
  },

  onTapped() {

    var that = this
    if (!this.data.display) {
      this.setData({
        display: true
      })
      this.animate('.crimson', [
        {translateY: wx.getSystemInfoSync().windowHeight},
        {translateY: 100 - wx.getSystemInfoSync().windowHeight},
      ], 1000, function () {
        that.clearAnimation('.crimson', function () {
          that.setData({
            display: false,
            crimsonTop: 100,
          })
        })
      }.bind(this))
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})