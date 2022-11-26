// pages/swipe/swipe.js

var animation;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0,
    startY: 0,
    showText: 'message',
    animationData: {},
    test_left: wx.getSystemInfoSync().windowWidth,
    motto: 'Hello World',
  },

  onTouchStart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })
  },

  onTouchEnd(e) {
    var endX = e.changedTouches[0].clientX
    var endY = e.changedTouches[0].clientY

    var startX = this.data.startX
    var startY = this.data.startY

    if (endX - startX > 0 && Math.abs(endY - startY) < 50) {
      console.log('to right')
      this.setData({
        showText: 'to right'
      })
    }
    if (endX - startX < 0 && Math.abs(endY - startY) < 50) {
      console.log('to left')
      this.setData({
        showText: 'to left'
      })
    }

  },

  onButtonTapped() {
    var animation = wx.createAnimation({
      delay: 0,
      duration: 5000,
      timingFunction: 'ease'
    })
    animation.translate(-100, 0).step()
    this.setData({
      // test_left:0,
      animationData: this.animation.export()
    })

  },

  start:function(){
    var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    });
    animation.opacity(0.2).translate(-100, 0).step()
    this.setData({
      ani:  animation.export()
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var animation = wx.createAnimation({
      delay: 0,
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
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