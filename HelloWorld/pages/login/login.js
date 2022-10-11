// pages/login.js

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    logs: '',
  },

  loginTest() {
    wx.login({
      success: (res) => {
        if(res.code) {
          console.log(res)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }


      }
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    console.log(avatarUrl)
    this.setData({
      avatarUrl,
      logs: avatarUrl
    })
  },

  onNetworkTest() {
    const that = this
    console.log('请求后台')
    wx.request({
      url: 'https://test.kiwistudio.work/api/test',
      data: {
        info: 'from mini-program'
      },
      success: (res) => {
        that.setData({
          logs: res.data.toString()
        })
      },
      method: 'POST'
    })
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