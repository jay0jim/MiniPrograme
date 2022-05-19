// index.js
// 获取应用实例
const app = getApp()

var interval = null

Page({
  data: {
    currentTimestamp: null,
    currentDate: null,
  },

  getCurrentTime() {
    //    
  },
  
  onLoad() {
    var timestamp = Date.now()
    var date = this.getDate(timestamp)
    this.setData({
      currentTimestamp: timestamp,
      currentDate: date
    })
  },

  onShow() {
    interval = setInterval(() => {
      var timestamp = Date.now()
      var date = this.getDate(timestamp)
      this.setData({
        currentTimestamp: timestamp,
        currentDate: date
      }) 
      // console.log(timestamp)
    }, 1000)
  },

  onHide() {
    clearInterval(interval)
  },

  onUnload() {
    clearInterval(interval)
  },

  stopInterval: function(e) {
    clearInterval(interval)
  },

  // 工具方法
  getDate(timestamp) {
    let now = new Date(timestamp)
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let dateStr = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day) + " " + now.toTimeString().substr(0, 8);
    // console.log(dateStr)
    return dateStr
  }
  
})
