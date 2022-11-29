// pages/calendar/calendar.js

const daysUtils = require("../../utils/kwCalculateDays").default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [],
    dayChecked: -1,
    dayEvents: [],
    isShow: false,
    currentDate: -1, // 当前日期的时间戳
    currentMonthStr: '',
    bgMonth: -1,
  },

  onPrevMonth() {
    var unixDate = this.data.currentDate
    var date = new Date(unixDate)
    var year = date.getFullYear()
    var month = date.getMonth()

    // 处理上一个月的逻辑
    month--
    if (month < 0) {
      month = 11
      year--
    }
    var newDate = new Date(year+"/"+(month+1)+"/01 00:00:00").getTime()

    // 组成标题年月
    var currentMonthStr = year.toString() + '.' + (month + 1).toString()
    // 获取当前年月的日期数
    var days = daysUtils.kwCalculateDays(year, month)

    // TODO: 
    var dayEvents = []
    for (const day in days) {
      if (Object.hasOwnProperty.call(days, day)) {
        const element = days[day];
        if (element != '') {
          // 随机生成0-6的整数
          var randomCount = Math.floor((Math.random() * 7))
          dayEvents.push(randomCount)
        } else {
          dayEvents.push(0)
        }
      }
    }

    this.setData({
      days: days,
      currentDate: newDate,
      currentMonthStr: currentMonthStr,
      dayChecked: -1,
      dayEvents: dayEvents,
      bgMonth: month+1,
    })
  },

  onNextMonth() {
    var unixDate = this.data.currentDate
    var date = new Date(unixDate)
    var year = date.getFullYear()
    var month = date.getMonth()

    // 处理下一个月的逻辑
    month++
    if (month > 11) {
      month = 0
      year++
    }
    var newDate = new Date(year+"/"+(month+1)+"/01 00:00:00").getTime()

    // 组成标题年月
    var currentMonthStr = year.toString() + '.' + (month + 1).toString()
    // 获取当前年月的日期数
    var days = daysUtils.kwCalculateDays(year, month)

    // TODO: 
    var dayEvents = []
    for (const day in days) {
      if (Object.hasOwnProperty.call(days, day)) {
        const element = days[day];
        if (element != '') {
          // 随机生成0-6的整数
          var randomCount = Math.floor((Math.random() * 7))
          dayEvents.push(randomCount)
        } else {
          dayEvents.push(0)
        }
      }
    }

    this.setData({
      days: days,
      currentDate: newDate,
      currentMonthStr: currentMonthStr,
      dayChecked: -1,
      dayEvents: dayEvents,
      bgMonth: month+1,
    })
  },

  onDayCellTapped(e) {
    var dayValue = e.currentTarget.dataset.dayvalue
    if (e.currentTarget.dataset.dayvalue != '' /* && dayValue != this.data.dayChecked*/ ) {
      this.setData({
        dayChecked: e.currentTarget.dataset.dayvalue
      })
    } else {
      this.setData({
        dayChecked: -1
      })
    }
  },

  onShowPopup() {
    this.setData({
      isShow: true
    });
  },

  onClose() {
    this.setData({
      isShow: false
    });
  },

  onConfirm(e) {
    var unixDate = e.detail
    var date = new Date(unixDate)
    console.log(date)
    var year = date.getFullYear()
    var month = date.getMonth()
    var currentMonthStr = year.toString() + '.' + (month + 1).toString()

    var days = daysUtils.kwCalculateDays(year, month)

    var dayEvents = []
    for (const day in days) {
      if (Object.hasOwnProperty.call(days, day)) {
        const element = days[day];
        if (element != '') {
          // 随机生成0-6的整数
          var randomCount = Math.floor((Math.random() * 7))
          dayEvents.push(randomCount)
        } else {
          dayEvents.push(0)
        }
      }
    }

    this.setData({
      days: days,
      currentDate: unixDate,
      currentMonthStr: currentMonthStr,
      isShow: false,
      dayChecked: -1,
      dayEvents: dayEvents,
      bgMonth: month + 1,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var currentDate = new Date().getTime()
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var currentMonthStr = year.toString() + '.' + (month + 1).toString()

    var days = daysUtils.kwCalculateDays(year, month)

    var dayEvents = []
    for (const day in days) {
      if (Object.hasOwnProperty.call(days, day)) {
        const element = days[day];
        if (element != '') {
          // 随机生成0-6的整数
          var randomCount = Math.floor((Math.random() * 7))
          dayEvents.push(randomCount)
        } else {
          dayEvents.push(0)
        }

      }
    }
    // console.log(dayEvents)
    this.setData({
      days: days,
      dayEvents: dayEvents,
      currentDate: currentDate,
      currentMonthStr: currentMonthStr,
      bgMonth: month + 1,
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