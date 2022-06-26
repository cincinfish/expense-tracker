const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const moment = require('moment')

router.get('/', async (req, res) => {
  const categoryId = req.query.categorySort ? req.query.categorySort : ""
  const categories = await Category.find().sort({ _id: 'asc' }).lean()
  let record
  if (categoryId) {
    const searchKey = { categoryId: { $in: categoryId } }
    record = await Record.find(searchKey).lean()
  } 
  else{
    record = await Record.find().lean()
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
      categories.filter(category => {
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
      res.render('index', { record, totalAmount, categories })
    })

})


module.exports = router