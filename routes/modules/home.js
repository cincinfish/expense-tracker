const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const moment = require('moment')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categorySort ? req.query.categorySort : ""
  const categories = await Category.find().sort({ _id: 'asc' }).lean()
  let record
  if (categoryId) {
    const searchKey = { categoryId }
    record = await Record.find({ $and: [{ userId }, searchKey] }).populate('categoryId').lean()
  }
  else {
    record = await Record.find({ userId }).populate('categoryId').lean()
  }
  let totalAmount = 0
  categories.forEach(item => {
    if (item._id.toString() === categoryId) {
      item.selected = 'selected'
    }
  })
  // 轉換類別、時間
  new Promise(function (resolve) {
    resolve()
  }).then(() => {
    for (let item of record) {
      item.date = moment(item.date).format('YYYY/MM/DD')
      totalAmount += item.amount
    }
  })
    .then(() => {
      res.render('index', { record, totalAmount, categories })
    })
})


module.exports = router