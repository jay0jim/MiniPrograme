const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import Toast from '@vant/weapp/toast/toast';

const kiwiNotificationCenter = require('../../utils/kiwiSingleton.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarURL: '',
    nickname: '点击设置头像和昵称',

    showUserInfoPopup: false,
    showLoadingPopup: true,

    // 用户openid
    openid: '',
  },

  showUserInfo(e) {
    wx.hideTabBar({
      animation: true,
    })
    this.setData({
      showUserInfoPopup: true,
    })
  },

  onClose() {
    wx.showTabBar({
      animation: true,
    })
    this.setData({
      showUserInfoPopup: false,
    })
  },

  onChooseAvatar(e) {
    let avatarURL = e.detail.avatarUrl
    this.setData({
      avatarURL: avatarURL
    })
    wx.uploadFile({
      filePath: avatarURL,
      name: 'avatar',
      url: 'https://api.kiwistudio.work/kiwi/user/upload',
      formData: {
        'avatarName': this.data.openid,
      },
      success: (res) => {
        console.log(res.data)
      },

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let app = getApp()

    console.log('-------')
    console.log(options)

    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
    });

    // var that = this
    // kiwiNotificationCenter.defaultCenter.registerNotification('FinishSavingUserInfo', () => {

    //   // let avatar = wx.getStorageSync('avatar')
    //   // let nickname = wx.getStorageSync('nickname')
    //   // let openid = wx.getStorageSync('openid')

    //   // if (avatar == defaultAvatarUrl || nickname == '用户') {
    //   //   nickname = '点击设置头像和昵称'
    //   // }

    //   // that.setData({
    //   //   avatarURL: avatar,
    //   //   nickname: nickname,
    //   //   openid: openid,
    //   // })

    //   // // if (avatarURL != defaultAvatarUrl) {
    //   // //   if (nickname.length <= 0) {
    //   // //     nickname = '微信用户'
    //   // //   }
    //   // //   if (avatarURL.length <= 0) {
    //   // //     avatarURL = defaultAvatarUrl
    //   // //   }

    //   // //   this.setData({
    //   // //     avatarURL: avatarURL,
    //   // //     nickname: nickname,
    //   // //   })
    //   // // } 


    //   // console.log('----' + that.data.openid)

    //   Toast.clear()
    // })


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