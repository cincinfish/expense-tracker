function isFuture(date) {
  let selectedDate = new Date(date.replace(/-/g, '-'))
  let today = new Date().toLocaleDateString()
  if (selectedDate > today) {
    return true
  }
  return false
}

module.exports = isFuture