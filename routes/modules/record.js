const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const checkDate = require('../../public/javascript/checkDate')
const isFuture = require('../../public/javascript/isFuture')
const moment = require('moment')
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

//edit 
router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const categoryData = await Category.find().lean()
  return Record.findOne({ _id })
    .lean()
    .then((record) => {
      categoryData.filter(category => {
        if (JSON.stringify(category._id) === JSON.stringify(record.categoryId)) {
          record.category = category.name
          return record.category
        }
      })
      record.date = moment(record.date).format('YYYY-MM-DD')
      return record
    }).then((record) => {
      res.render('edit', { record, categories: categoryData })
    })
    .catch(error => {
      console.log(error)
      res.render('edit', { error: error.message })
    })
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
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

  Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('/', { error: error.message })
    })
})

module.exports = router