function isFuture(date) {
  let selectedDate = new Date(date.replace(/-/g, '-'))
  let today = new Date()
  if (selectedDate > today) {
    return true
  }
  return false
}

module.exports = isFuture