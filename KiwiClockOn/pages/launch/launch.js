const utils = require('../../utils/kiwiRequest').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toastHidden: false,
    fromPage: '',
  },

  quickLogin() {
    // 先使用session_id登录，如果已过期，则再请求res_code后再登录
    var that = this
    utils.kwRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/login',
      method: 'POST',
      data: {

      },
      success: (res, s_id) => {
        // 登录出错
        if (res.data.code == 200) {
          // 登录成功
          console.log(res.data, s_id, res.data.data.openid)
          this.saveUserInfo(res.data.data)

        } else {

          // 提示需请求res_code再登录
          if (res.data.code == 400200) {
            console.log('需要重新登陆')
            that.login()
          }

          console.log(res)
        }
      }
    })

  },

  login() {
    var that = this
    wx.login({
      success: (res) => {
        if (res.code) {
          var data_dic = {
            res_code: res.code,
          }

          utils.kwRequestWithSessionId({
            url: 'https://api.kiwistudio.work/kiwi/user/login',
            data: data_dic,
            method: 'POST',
            success: (res, s_id) => {
              console.log(res.data, s_id, res.data.data.openid)
              that.saveUserInfo(res.data.data)
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }


      }
    })
  },

  saveUserInfo(data) {
    wx.setStorageSync('openid', data.openid)
    wx.setStorageSync('nickname', data.nickname)
    wx.setStorageSync('avatar', data.avatar)
    console.log(data.avatar)

    let hasSetInfo = data.has_set_info
    wx.setStorageSync('hasSetInfo', hasSetInfo)

    // 取消菊花显示
    this.setData({
      toastHidden: true,
    })

    // 如未设置头像和昵称，则跳转到init页面
    if (hasSetInfo == 0) {
      wx.redirectTo({
        url: '/pages/init/init?from=launch&share=' + this.data.fromPage,
      })
    } else {
      // 如已设置头像和昵称，则跳转到index页面，或分享过来的页面
      if (this.data.fromPage != '') {
        wx.switchTab({
          url: this.data.fromPage,
        })
      } else {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    if (options['from'] != null) {
      this.setData({
        fromPage: options['from'],
      })
    }

    console.log(this.data.fromPage)

    // 登录，获取openid
    this.quickLogin()

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