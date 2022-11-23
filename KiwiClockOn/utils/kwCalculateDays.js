function kwCalculateDays(year, month) {
  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var firstDay = new Date(year, month, 1).getDay()
  var month_days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    for (var i = 0; i < firstDay; i++) {
    month_days.push('')
  }
  for (var i = 1; i < daysOfMonth[month] + 1; i++) {
    month_days.push(i.toString())
  }
  var rest = 42 - daysOfMonth[month] - firstDay - 7
  for (var i = 0; i < rest; i++) {
    month_days.push('')
  }
  return month_days
}

export default {
  kwCalculateDays,
}