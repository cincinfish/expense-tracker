const Category = require('../models/category')
const Record = require('../models/record')
const checkDate = require('../public/javascript/checkDate')
const isFuture = require('../public/javascript/isFuture')
const moment = require('moment')

const recordController = {
  getCreatePage: async (req, res, next) => {
    try {
      const categories = await Category.find()
        .lean()
        .sort('_id')
      res.render('new', { categories })
    } catch (err) {
      next(err)
    }
  },
  createRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const { name, date, categoryId, amount } = req.body
      const categories = await Category.find().lean()
      const errors = []
      if (!name || !date || !categoryId || !amount) {
        errors.push({ msg: '所有欄位都是必填' })
      }
      if (checkDate(date) === false) {
        errors.push({ msg: '請輸入合法日期' })
      }
      if (isFuture(date) === true) {
        errors.push({ msg: '請勿輸入未來日期' })
      }
      if (errors.length) {
        return res.render('new', {
          errors, name, date, categoryId, amount, categories
        })
      }
      await Record.create({ userId, name, date, categoryId, amount })
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  getEditPage: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const categoryData = await Category.find().lean()
      const record = await Record.findOne({ userId, _id }).populate('categoryId').lean()
      record.date = moment(record.date).format('YYYY-MM-DD')

      res.render('edit', { record, categories: categoryData })
    } catch (err) {
      next(err)
    }
  },
  editRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const { name, date, categoryId, amount } = req.body
      const categories = await Category.find().lean()
      const errors = []
      if (!name || !date || !categoryId || !amount) {
        errors.push({ msg: '所有欄位都是必填' })
      }
      if (checkDate(date) === false) {
        errors.push({ msg: '請輸入合法日期' })
      }
      if (isFuture(date) === true) {
        errors.push({ msg: '請勿輸入未來日期' })
      }
      if (errors.length) {
        return res.render('new', {
          errors, name, date, categoryId, amount, categories
        })
      }
      await Record.findByIdAndUpdate({ userId, _id }, req.body)
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  editRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const { name, date, categoryId, amount } = req.body
      const categories = await Category.find().lean()
      const errors = []
      if (!name || !date || !categoryId || !amount) {
        errors.push({ msg: '所有欄位都是必填' })
      }
      if (checkDate(date) === false) {
        errors.push({ msg: '請輸入合法日期' })
      }
      if (isFuture(date) === true) {
        errors.push({ msg: '請勿輸入未來日期' })
      }
      if (errors.length) {
        return res.render('new', {
          errors, name, date, categoryId, amount, categories
        })
      }
      await Record.findByIdAndUpdate({ userId, _id }, req.body)
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  deleteRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      await Record.findOneAndDelete({ userId, _id })
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = recordController