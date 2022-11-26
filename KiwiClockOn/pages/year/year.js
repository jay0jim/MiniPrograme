const timeUtils = require("../../utils/kwCalculateDays").default
const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030 ]




// pages/year/year.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthDays: [],
    dataYears: years,
    test: [[1], [2]]
  },

  onYearCellTap(e) {
    var data = e.currentTarget.dataset
    var month = data.month
    var month_name = data.month_name
    var year = data.year

    var that = this
    wx.navigateTo({
      url: '../month/month',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { 
          month: month, 
          month_name: month_name,
          month_days: that.data.monthDays[year][month],
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    var monthDays = []
    for (var k = 0; k < years.length; k++) {
      var year = years[k]
      var yearMonths = []
      for(var j = 0; j < 12; j++) {
        var days = timeUtils.kwCalculateDays(year,j)
        yearMonths.push(days)
      }
      monthDays.push(yearMonths)
    }
    this.setData({
      monthDays: monthDays,
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