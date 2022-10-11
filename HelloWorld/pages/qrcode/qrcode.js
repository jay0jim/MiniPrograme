// pages/qrcode.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeText: 'https://www.baidu.com',
    scanResult: '',
  },

  myScanCode() {
    var that = this
    wx.scanCode({
      success(res) {
        wx.navigateTo({
          url: '../wxml/index',
        })
        that.setData({
          scanResult: res.result,
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  createQRCode() {
    const query = wx.createSelectorQuery()
    query.select('#myQrcode')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        var canvas = res[0].node

        // 调用方法drawQrcode生成二维码
        drawQrcode({
          canvas: canvas,
          canvasId: 'myQrcode',
          width: 260,
          padding: 30,
          background: '#ffffff',
          foreground: '#000000',
          text: this.data.qrcodeText,
        })

        // 获取临时路径（得到之后，想干嘛就干嘛了）
        // wx.canvasToTempFilePath({
        //   canvasId: 'myQrcode',
        //   canvas: canvas,
        //   x: 0,
        //   y: 0,
        //   width: 260,
        //   height: 260,
        //   destWidth: 260,
        //   destHeight: 260,
        //   success(res) {
        //     console.log('二维码临时路径：', res.tempFilePath)
        //   },
        //   fail(res) {
        //     console.error(res)
        //   }
        // })
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
    this.createQRCode();

    const query = wx.createSelectorQuery()
    query.select('#testCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        var canvas = res[0].node
        var ctx = canvas.getContext("2d")

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 150, 75);
        
      })
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