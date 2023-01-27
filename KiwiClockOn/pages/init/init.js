import Toast from '@vant/weapp/toast/toast';

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: '',
  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    // wx.uploadFile({
    //   filePath: avatarURL,
    //   name: 'avatar',
    //   url: 'https://api.kiwistudio.work/kiwi/user/upload',
    //   formData: {
    //     'avatarName': this.data.openid,
    //   },
    //   success: (res) => {
    //     console.log(res.data)
    //   },

    // })
  },

  onConfirmUserInfo(e) {
    let nickname = e.detail.value.nickname

    if (nickname != '' && this.data.avatarUrl != defaultAvatarUrl) {
      wx.setStorageSync('avatarUrl', this.data.avatarUrl)
      wx.setStorageSync('nickname', nickname)
      wx.setStorageSync('fromInit', 1)
      // 切换到主界面，由于有tab，所以需要使用switchTab
      wx.switchTab({
        url: '/pages/index/index',
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