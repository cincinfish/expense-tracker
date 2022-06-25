const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const moment = require('moment')

router.get('/', async (req, res) => {
  const categoryData = await Category.find().sort({ _id: 'asc' }).lean()
  const record = await Record.find().lean()
  let totalAmount = 0
  // 轉換類別、時間
  new Promise(function (resolve) {
    resolve()
  }).then(() => {
    for (let item of record) {
      categoryData.filter(category => {
        if (JSON.stringify(category._id) === JSON.stringify(item.categoryId)) {
          item.icon = category.icon
          return item.icon
        }
      })
      item.date = moment(item.date).format('YYYY/MM/DD')
      totalAmount += item.amount
    }
  })
    .then(() => {
      res.render('index', { record, totalAmount })
    })

})


module.exports = router