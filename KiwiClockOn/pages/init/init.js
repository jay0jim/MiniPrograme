import Toast from '@vant/weapp/toast/toast';

const utils = require('../../utils/kiwiRequest').default
const FormData = require('../../utils/FormData.js').default

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: '',
    openid: '',
  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })

  },

  onConfirmUserInfo(e) {
    let nickname = e.detail.value.nickname

    if (nickname != '' && this.data.avatarUrl != defaultAvatarUrl) {
      // 把头像上传到服务器
      wx.uploadFile({
        filePath: this.data.avatarUrl,
        name: 'avatar',
        url: 'https://api.kiwistudio.work/kiwi/user/upload',
        formData: {
          'avatarName': this.data.openid,
        },
        success: (res) => {
          let resData = JSON.parse(res.data)
          let fileUrl = resData.file_url

          wx.setStorageSync('avatar', fileUrl)
          wx.setStorageSync('nickname', nickname)

          // 把头像和昵称上传到服务器
          utils.kwRequestWithSessionId({
            url: 'https://api.kiwistudio.work/kiwi/user/update_info',
            method: 'POST',
            data: {
              avatar: fileUrl,
              nickname: nickname,
            },
            success: (res) => {
              console.log(res)
            },
          })

          // 切换到主界面，由于有tab，所以需要使用switchTab
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
      })


    } else {
      Toast.fail({
        duration: 1800,
        message: '请设置头像和昵称',
        forbidClick: true,
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var fromRoute = options.from
    if (fromRoute == 'launch') {
      wx.hideHomeButton({
        success: (res) => {},
      })
    }
    let openid = wx.getStorageSync('openid')
    this.setData({
      openid: openid,
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