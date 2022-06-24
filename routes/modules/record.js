const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const checkDate = require('../../public/javascript/checkDate')
const isFuture = require('../../public/javascript/isFuture')
// create
router.get('/new', async (req, res) => {
  const categories = await Category.find()
    .lean()
    .sort('_id')
  res.render('new', { categories })
})

router.post('/', async (req, res) => {
  const { name, date, categoryId, amount } = req.body
  const categories = await Category.find().lean()
  const errors = []
  if (!name || !date || !categoryId || !amount) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (checkDate(date) === false) {
    errors.push({ message: '請輸入合法日期' })
  }
  if (isFuture(date) === true) {
    errors.push({ message: '請勿輸入未來日期' })
  }

  if (errors.length) {
    return res.render('new', {
      errors, name, date, categoryId, amount, categories
    })
  }
  await Record.create({ name, date, categoryId, amount })
  res.redirect('/')
})

module.exports = router