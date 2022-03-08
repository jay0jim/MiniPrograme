// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: 0,
    calendarString: '',
    dateList: [],
    currentSelected: 0,
  },

  handleShowCalendar() {
    var year = new Date().getFullYear()
    var month = new Date().getMonth()
    var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    var dateList = []

    var startDay = new Date(Date.UTC(year, month, 1)).getDay()
    var endDay = new Date(Date.UTC(year, month, daysOfMonth[month])).getDay()

    var uniqueKey = 0
    var today = new Date().getDate()
    console.log(today)

    // 从周日开始，如果1号不是周日，那么往上一个月推
    if (startDay > 0) {
      // 判断是否为闰年
      daysOfMonth[1] = (year % 4 == 0 && (year % 100 != 0) || (year % 400 == 0)) ? 29 : 28
      var tempMonth = month - 1
      var tempYear = year
      if (tempMonth < 0) {
        tempMonth = 11
        tempYear -= 1
      }
      var day = daysOfMonth[tempMonth] - startDay + 1
      startDay = 0

      // 上月
      for (var i = day; i <= daysOfMonth[tempMonth]; i++) {
        dateList.push({
          'day': startDay,
          'date_ri': i,
          'uniqueKey': uniqueKey++,
          'currentMonth': tempMonth,
          'isToday': 0,
          'isSelected': 0,
        })
        startDay++
      }
    }

    // 当月
    for (var i = 1; i <= daysOfMonth[month]; i++) {
      if (startDay > 6) {
        startDay = 0
      }
      var isToday = (today==i)? 1 : 0
      dateList.push({
        'day': startDay,
        'date_ri': i,
        'uniqueKey': uniqueKey++,
        'currentMonth': month,
        'isToday': isToday,
        'isSelected': isToday,
      })
      startDay++
    }

    // 如果最后一日不是周六，那么往后一个月推
    if (endDay < 6) {
      var tempMonth = month + 1
      var tempYear = (tempMonth > 11) ? year + 1 : year
      var day = 1
      // 下月
      for (i = startDay; i < 7; i++) {
        dateList.push({
          'day': i,
          'date_ri': day,
          'uniqueKey': uniqueKey++,
          'currentMonth': tempMonth,
          'isToday': 0,
          'isSelected': 0,
        })
        day++
      }
    }

    var strDay = ''
    for (var i = 0; i < dateList.length; i++) {
      strDay += String(dateList[i]['date_ri'])
      strDay += ' '
      if (i % 7 == 6) {
        strDay += '\n'
      }
    }

    this.setData({
      calendarString: strDay,
      dateList: dateList,
    })

    console.log(this.data.dateList)

  },

  handleSelectedDay(evt) {
    var self = this
    var selectedDate = evt.currentTarget.dataset['date']
    console.log(selectedDate)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date().getDate()
    this.data.currentSelected = today

    this.handleShowCalendar()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})