const Category = require('../models/category')
const Record = require('../models/record')
const moment = require('moment')
const mongoose = require('mongoose')
const monthList = require('../public/javascript/month.json').month

const homeController = {
  getRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categoryOption = req.query.categorySort || ""
      let CategoryOptionObj
      // trans to Obj to match
      if (categoryOption) {
        CategoryOptionObj = mongoose.Types.ObjectId(req.query.categorySort)
      }
      const yearOption = req.query.yearSort || ""
      const monthOption = req.query.monthSort || ""
      const categories = await Category.find().sort({ _id: 'asc' }).lean()

      let records = await Record.aggregate(
        [
          {
            $project: {
              id: 1,
              name: 1,
              categoryId: 1,
              date: 1,
              amount: 1,
              year: { $year: '$date' },
              month: { $month: '$date' },
              userId: 1
            },
          },
          {
            $match: {
              userId,
              categoryId: CategoryOptionObj ? CategoryOptionObj : String,
              year: yearOption ? Number(yearOption) : Number,
              month: monthOption ? Number(monthOption) : Number
            }
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'categoryId',
              foreignField: '_id',
              as: 'category'
            }
          },
          { $sort: { date: -1 } }
        ]
      )
      let totalAmount = 0
      // 類別 selected
      categories.forEach(item => {
        if (item._id.toString() === categoryOption) {
          item.selected = 'selected'
        }
      })
      let yearList = new Set()
      //let monthList = new Set()
      for (let item of records) {
        yearList = yearList.add(new Date(item.date).getFullYear())
        //monthList = monthList.add(new Date(item.date).getMonth() + 1)
        item.date = moment(item.date).format('YYYY/MM/DD')
        totalAmount += item.amount
      }
      res.render('index', { records, totalAmount, categories, yearList, monthList })
    } catch (err) {
      next(err)
    }
  }

}

module.exports = homeController