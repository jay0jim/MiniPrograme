// pages/login.js

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    logs: '',
    session_id: '',
  },

  loginTest() {

    wx.login({
      success: (res) => {
        if(res.code) {
          var session_id = app.globalData.session_id
          var data_dic = {
            res_code: res.code,
          }
          if(session_id != null) {
            data_dic['session_id'] = session_id
          }


          wx.request({
            url: 'https://test.kiwistudio.work/kiwi/user/login',
            data: data_dic,
            success: (r) => {
              console.log(r.data.session_id)
              // 把session_id保存到本地
              app.globalData.session_id = r.data.session_id
              wx.setStorageSync('session_id', r.data.session_id)

              that.setData({
                session_id: r.data.session_id
              })
            },
            method: 'POST'
          })
          
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
      url: 'https://test.kiwistudio.work/kiwi/test',
      data: {
        info: 'from mini-program'
      },
      success: (res) => {
        console.log(res)
      },
      method: 'POST'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var session_id = app.globalData.session_id

    this.setData({
      session_id: session_id,
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