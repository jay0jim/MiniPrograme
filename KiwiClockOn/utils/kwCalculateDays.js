function kwCalculateDays(year, month) {
  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // 判断是否为闰年
  if (year % 4 == 0 && year % 100 != 0)
    daysOfMonth[1] = 29
  else if (year % 400 == 0)
    daysOfMonth[1] = 29

  var firstDay = new Date(year, month, 1).getDay()
  var month_days = ['日', '一', '二', '三', '四', '五', '六']
    for (var i = 0; i < firstDay; i++) {
    month_days.push('')
  }
  for (var i = 1; i < daysOfMonth[month] + 1; i++) {
    month_days.push(i.toString())
  }
  var rest = 49 - daysOfMonth[month] - firstDay - 7
  for (var i = 0; i < rest; i++) {
    month_days.push('')
  }
  return month_days
}

export default {
  kwCalculateDays,
}