// app.js
const utils = require('./utils/kiwiRequest').default

App({
  onLaunch() {
    // 登录，获取openid
    this.quickLogin()
  },

  quickLogin() {
    // 先使用session_id登录，如果已过期，则再请求res_code后再登录
    var that = this
    utils.kwRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/login',
      method: 'POST',
      data:{

      },
      success: (res, s_id) => {
        // 登录出错
        if (res.data.code == 200) {
          // 登录成功
          console.log(res.data, s_id, res.data.data.openid)
          wx.setStorageSync('openid', res.data.data.openid)
          
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

              wx.setStorageSync('openid', res.data.data.openid)
            }
          })

          // wx.request({
          //   url: 'https://api.kiwistudio.work/kiwi/user/login',
          //   data: data_dic,
          //   method: 'POST',
          //   success: (res) => {
          //     console.log(res.data.msg, res.data.session_id)

          //     that.setData({
          //       session_id: res.data.session_id
          //     })

          //     app.globalData.session_id = res.data.session_id
          //     wx.setStorageSync('session_id', res.data.session_id)
          //   }
          // })


        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }


      }
    })
  },

  globalData: {
    userInfo: null
  }
})
