// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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