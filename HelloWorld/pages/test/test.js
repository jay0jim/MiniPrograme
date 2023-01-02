// pages/test/test.js
const COS = require('cos-js-sdk-v5');
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cosObject: null,
    avatarURL: defaultAvatarUrl,
  },

  initCOS() {
    // 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
    var Bucket = 'init-1300883012'; /* 存储桶，必须字段 */

    // 存储桶region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
    // 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
    var Region = 'ap-guangzhou'; /* 存储桶所在地域，必须字段 */

    var cos = new COS({
      getAuthorization: (options, callback) => {
        let url = 'https://api.kiwistudio.work/kiwi/user/get_temp_credential'
        wx.request({
          url: url,
          success: (res) => {
            let credentials = res.data.credentials
            if (!res || !credentials) {
              return 'Error!'
            }
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              StartTime: res.data.startTime,
              ExpiredTime: res.data.expiredTime,
            })
          }
        })
      }
    })

    this.setData({
      cosObject: cos,
    })
  },

  onUploadFile() {
    


  },

  onChooseAvatar(e) {
    let avatarURL = e.detail.avatarUrl
    this.setData({
      avatarURL: avatarURL
    })
    // wx.setStorageSync('avatarURL', avatarURL)
    // console.log(wx.getStorageSync('avatarURL'))
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initCOS()
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