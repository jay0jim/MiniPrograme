import Toast from '@vant/weapp/toast/toast';
const daysUtils = require("../../utils/kwCalculateDays").default


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentHour: -1,
    currentWeek: [],
    currentDateStr: "",
    offsetTopRatio: 0.0,
    timeTable: [],
    isShowEvent: false,
    displayingDate: {},

    // 滑动手势记录
    startX: 0,
    startY: 0,
  },

  // 计算本周日期
  kwCalculateCurrentWeek(date, today, currentMonth, currentYear) {

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
      for (var i = startDate; i <= prevMonthDays; i++) {
        currentWeek.push((prevMonth + 1) + '月' + i + '日')
      }
      for (var i = 1; i <= date; i++) {
        currentWeek.push((currentMonth + 1) + '月' + i + '日')
      }
    } else {
      for (var i = startDate; i <= date; i++) {
        currentWeek.push((currentMonth + 1) + '月' + (i) + '日')
      }
    }

    // 跨下月
    var endDate = date + 6 - today
    var currentMonthDays = daysUtils.kwGetMonthDays(currentYear, currentMonth)
    if (endDate > currentMonthDays) {
      var nextMonth = currentMonth + 1
      var year = currentYear
      if (nextMonth > 11) {
        nextMonth = 0
        year += 1
      }
      endDate -= currentMonthDays
      for (var i = date + 1; i <= currentMonthDays; i++) {
        currentWeek.push((currentMonth + 1) + '月' + (i) + '日')
      }
      for (var i = 1; i <= endDate; i++) {
        currentWeek.push((nextMonth + 1) + '月' + i + '日')
      }
    } else {
      for (var i = date + 1; i <= endDate; i++) {
        currentWeek.push((currentMonth + 1) + '月' + i + '日')
      }
    }

    return currentWeek
  },

  // 计算下周日期
  kwCalculateNextWeek(currentDate, today, currentMonth, currentYear) {
    // debugger

    let nextDate = currentDate + 7
    let nextMonth = currentMonth
    let nextYear = currentYear
    let currentMonthDays = daysUtils.kwGetMonthDays(currentYear, currentMonth)
    if (nextDate > currentMonthDays) {
      nextDate -= currentMonthDays
      nextMonth += 1
      if (nextMonth > 11) {
        nextMonth = 0
        nextYear += 1
      }
    }
    var nextWeek = this.kwCalculateCurrentWeek(nextDate, today, nextMonth, nextYear)

    let displayingDate = {
      'date': nextDate,
      'today': today,
      'currentMonth': nextMonth,
      'currentYear': nextYear,
    }
    this.setData({
      displayingDate: displayingDate
    })

    return nextWeek
  },

  // 计算上周日期
  kwCalculatePrevWeek(currentDate, today, currentMonth, currentYear) {
    let prevDate = currentDate - 7
    let prevMonth = currentMonth
    let prevYear = currentYear
    if (prevDate < 0) {
      prevMonth -= 1
      if (prevMonth < 0) {
        prevMonth = 11
        prevYear -= 1
      }
      let prevMonthDays = daysUtils.kwGetMonthDays(prevYear, prevMonth)
      prevDate = prevMonthDays + prevDate
    }
    var prevWeek = this.kwCalculateCurrentWeek(prevDate, today, prevMonth, prevYear)

    let displayingDate = {
      'date': prevDate,
      'today': today,
      'currentMonth': prevMonth,
      'currentYear': prevYear,
    }
    this.setData({
      displayingDate: displayingDate
    })

    return prevWeek


  },

  // 处理下周逻辑
  kwHandleNextWeek() {
    let displayingDate = this.data.displayingDate
    var date = displayingDate.date
    var today = displayingDate.today
    var currentMonth = displayingDate.currentMonth
    var currentYear = displayingDate.currentYear
    let nextWeek = this.kwCalculateNextWeek(date, today, currentMonth, currentYear)
    
    // 更新ui
    this.setData({
      currentWeek: nextWeek,
    })
    // 气泡提示
    Toast({
      type: 'html',
      // message: "<br><center><p style=\"font-size: 100px\">\n12<\p><\center><br><br><br><center><p style=\"font-size: 20px\">切换成功<\p><\center>",
      message: '已切换到下一周',
      duration: 1000,
      forbidClick: true,
    });
  },

  // 处理上周逻辑
  kwHandlePrevWeek() {
    let displayingDate = this.data.displayingDate
    var date = displayingDate.date
    var today = displayingDate.today
    var currentMonth = displayingDate.currentMonth
    var currentYear = displayingDate.currentYear
    let prevWeek = this.kwCalculatePrevWeek(date, today, currentMonth, currentYear)

    // 更新ui
    this.setData({
      currentWeek: prevWeek,
    })
    // 气泡提示
    Toast({
      type: 'html',
      // message: "<br><center><p style=\"font-size: 100px\">\n12<\p><\center><br><br><br><center><p style=\"font-size: 20px\">切换成功<\p><\center>",
      message: '已切换到上一周',
      duration: 1000,
      forbidClick: true,
    });
  },

  onTouchStart(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
    })
  },

  onTouchEnd(e) {
    var endX = e.changedTouches[0].clientX
    var endY = e.changedTouches[0].clientY

    var startX = this.data.startX
    var startY = this.data.startY

    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
      this.kwHandlePrevWeek()
    }
    if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
      this.kwHandleNextWeek()
    }
  },

  onTapEvents(e) {
    var hour = e.currentTarget.dataset.hour
    var index = e.currentTarget.dataset.index
    var eventContent = e.currentTarget.dataset.eventContent
    var eventDate = e.currentTarget.dataset.eventDate
    console.log(hour, index, eventContent, eventDate)
    this.setData({
      isShowEvent: true,
    })
  },

  onClose() {
    this.setData({
      isShowEvent: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取当前日期和周
    var date = new Date().getDate()
    var today = new Date().getDay()
    var currentMonth = new Date().getMonth()
    var currentYear = new Date().getFullYear()
    let displayingDate = {
      'date': date,
      'today': today,
      'currentMonth': currentMonth,
      'currentYear': currentYear,
    }
    var currentWeek = this.kwCalculateCurrentWeek(date, today, currentMonth, currentYear)
    var currentDateStr = (currentMonth + 1) + '月' + date + '日'

    // 设置时间红线
    var currentHour = new Date().getHours()
    var currentMinute = new Date().getMinutes()
    var offsetTopRatio = currentMinute / 60.0

    // mock data
    var timeTable = []
    for (let i = 0; i < 7; i++) {
      var test = []
      for (let j = 0; j < 24; j++) {
        var a = []
        test.push(a)
      }
      timeTable.push(test)
    }
    // 随机插入数据测试
    var mock = {
      'title': 'test test test',
      'duration': 2.0,
    }
    timeTable[6][8].push(mock)
    timeTable[6][10].push(mock)
    timeTable[6][13].push(mock)
    timeTable[6][15].push(mock)
    timeTable[6][17].push(mock)
    timeTable[6][19].push(mock)
    timeTable[0][8].push(mock)
    timeTable[0][10].push(mock)
    timeTable[0][13].push(mock)
    timeTable[0][15].push(mock)
    timeTable[0][17].push(mock)
    timeTable[0][19].push(mock)
    // console.log(mock['duration'])
    // console.log(timeTable[3][20].length)





    // Toast({
    //   type: 'html',
    //   // message: "<br><center><p style=\"font-size: 100px\">\n12<\p><\center><br><br><br><center><p style=\"font-size: 20px\">切换成功<\p><\center>",
    //   message: '',
    //   duration: 1000,
    //   forbidClick: true,
    // });



    this.setData({
      currentHour: currentHour,
      offsetTopRatio: offsetTopRatio,
      currentWeek: currentWeek,
      timeTable: timeTable,
      currentDateStr: currentDateStr,
      displayingDate: displayingDate,
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