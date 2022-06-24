function checkDate(date) {
  let limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let DateObject = date.split('-')
  let year = Number(DateObject[0])
  let month = Number(DateObject[1])
  let day = Number(DateObject[2])
  if (month > 12 || month < 1) {
    return false
  }
  //閏年
  let isLeap = new Date(year, 1, 29).getDate() === 29
  if (isLeap ) {
    limitInMonth[1] = 29
  }
  return day <= limitInMonth[month - 1]
}

module.exports = checkDate