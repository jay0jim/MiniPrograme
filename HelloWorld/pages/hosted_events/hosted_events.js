// pages/hosted_events.js

var utils = require('../../utils/kiwiRequest.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const eventChannel = this.getOpenerEventChannel()
    // // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })

    var that = this
    utils.kiwiRequestWithSessionId({
      url:'https://api.kiwistudio.work/kiwi/user/my_hosted',
      data: {
        'date_begin': '0000-01-01',
        'page': 1
      },
      success: (res, session_id) => {
        
        console.log(session_id)
        console.log(res.data)

      },
      method: 'POST'
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