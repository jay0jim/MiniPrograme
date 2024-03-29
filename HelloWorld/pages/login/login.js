// pages/login.js
// import {createRequestHeader} from '../../request_header'

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var app = getApp()
var utils = require('../../utils/kiwiRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    logs: '',
    session_id: '',
  },

  onQuickLogin() {
    // 先使用session_id登录，如果已过期，则再请求res_code后再登录
    var that = this
    utils.kiwiRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/login',
      method: 'POST',
      data:{

      },
      success: (res, s_id) => {
        // 登录出错
        if (res.data.code == 200) {
          // 登录成功
          console.log(res.data, s_id)
          that.setData({
            session_id: s_id
          })
          
        } else {
          
          // 提示需请求res_code再登录
          if (res.data.code == 400200) {
            console.log('需要重新登陆')
            that.loginTest()
          }

          console.log(res)
        }
      }
    })

  },

  loginTest() {
    var that = this
    wx.login({
      success: (res) => {
        if (res.code) {
          var data_dic = {
            res_code: res.code,
          }

          utils.kiwiRequestWithSessionId({
            url: 'https://api.kiwistudio.work/kiwi/user/login',
            data: data_dic,
            method: 'POST',
            success: (res, s_id) => {
              console.log(res.data, s_id)

              that.setData({
                session_id: s_id
              })
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

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    console.log(avatarUrl)
    this.setData({
      avatarUrl,
      logs: avatarUrl
    })
  },

  onNetworkTest() {
    const that = this
    console.log(that.data.session_id)
    var header = {
      'Cookie': this.data.session_id
    }

    console.log('请求后台')
    wx.request({
      url: 'https://api.kiwistudio.work/kiwi/test',
      header: header,
      data: {
        info: 'from mini-program'
      },
      success: (res) => {
        var cookie = res.header['Set-Cookie']
        if (cookie != null) {
          if (cookie.indexOf('session=') != -1) {
            // 使用正则表达式把session=XXXXX提取出来
            // 并保存到全局变量和本地中
            var session_id = cookie.match("\\bsession=([^;]*)\\b")[0]

            app.globalData.session_id = session_id
            wx.setStorageSync('session_id', session_id)

            that.setData({
              session_id: session_id
            })
          }

        }
      },
      method: 'POST'
    })
  },

  onNewTest() {

    utils.kiwiRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/test',
      data: {
        info: 'from mini-program'
      },
      success: (res, session_id) => {
        var that = this
        console.log(session_id)
        console.log(res.data.info)

        that.setData({
          session_id: session_id
        })
      },
      method: 'POST'
    })
  },

  onLogout() {
    utils.kiwiRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/logout',
      success: (res, session_id) => {
        var that = this
        console.log(session_id)
        console.log(res)

        that.setData({
          session_id: session_id
        })
      },

    })
  },

  onCheckSession() {
    utils.kiwiRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/session',
      success: (res, session_id) => {
        var that = this
        console.log(session_id)
        console.log(res.data)
      },
    })
  },

  onCreateEvent() {
    utils.kiwiRequestWithSessionId({
      url: 'https://api.kiwistudio.work/kiwi/user/create_event',
      // data: {
      //   title: '测试普通活动，2小时',
      //   date: '2022-10-27 10:00:00',
      //   duration: 120,
      //   content: '测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时测试普通活动，2小时'
      // },
      data: {
        title: '测试全天活动，2天',
        date: '2022-10-27',
        duration: -2,
        content: '测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天测试全天活动，2天'
      },
      success: (res, session_id) => {
        var that = this
        console.log(res.data)

      },
      method: 'POST'
    })
  },

  onGetHostedEvents() {
    wx.navigateTo({
      url: '../hosted_events/hosted_events',
      success: (res) => {
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'aaa' })
      }
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