import Toast from '@vant/weapp/toast/toast';
const daysUtils = require("../../utils/kwCalculateDays").default


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentHour: -1,
    offsetTopRatio: 0.0,
    currentWeek: [],

  },

  // 计算本周日期
  kwCalculateCurrentWeek(date, today, currentMonth, currentYear) {
    // var date = 31
    // var today = 0
    // var currentMonth = 9
    // var currentYear = 2021

    var currentWeek = []
    var startDate = date - today
    // 跨上月
    if (startDate <= 0) {
      var prevMonth = currentMonth - 1
      var year = currentYear
      // 跨年
      if (prevMonth < 0) {
        year -= 1
        prevMonth = 11
      }
      var prevMonthDays = daysUtils.kwGetMonthDays(year, prevMonth)
      startDate += prevMonthDays
      for(var i = startDate; i <= prevMonthDays; i++) {
        currentWeek.push((prevMonth+1)+'月'+i+'日')
      }
      for(var i = 1; i <= date; i++) {
        currentWeek.push((currentMonth+1)+'月'+i+'日')
      }
    } else {
      for(var i = startDate; i <= date; i++) {
        currentWeek.push((currentMonth+1)+'月'+(i)+'日')
      }
    }
    
    // 跨下月
    var endDate = date + 6 - today
    var currentMonthDays = daysUtils.kwGetMonthDays(currentYear, currentMonth)
    if(endDate > currentMonthDays) {
      var nextMonth = currentMonth + 1
      var year = currentYear
      if(nextMonth > 11) {
        nextMonth = 0
        year += 1
      }
      endDate -= currentMonthDays
      for(var i = date+1; i <= currentMonthDays; i++) {
        currentWeek.push((currentMonth+1)+'月'+(i)+'日')
      }
      for(var i = 1; i <= endDate; i++) {
        currentWeek.push((nextMonth+1)+'月'+i+'日')
      }
    } else {
      for (var i = date+1; i <= endDate; i++) {
        currentWeek.push((currentMonth+1)+'月'+i+'日')
      }
    }

    return currentWeek
  },

  onTouchStart(e) {
    console.log('touch start')
  },

  onTouchEnd(e) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var date = new Date().getDate()
    var today = new Date().getDay()
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()
    var currentWeek = this.kwCalculateCurrentWeek(date, today, currentMonth, currentYear)

    var currentHour = new Date().getHours()
    var currentMinute = new Date().getMinutes()
    var offsetTopRatio = currentMinute / 60.0
    this.setData({
      currentHour: currentHour,
      offsetTopRatio: offsetTopRatio,
      currentWeek: currentWeek,
    })

    Toast({
      type: 'html',
      // message: "<br><center><p style=\"font-size: 100px\">\n12<\p><\center><br><br><br><center><p style=\"font-size: 20px\">切换成功<\p><\center>",
      message: '',
      duration: 1000,
      forbidClick: true,
    });
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