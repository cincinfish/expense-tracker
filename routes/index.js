const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')
router.use('/', home)
router.use('/record', record)
router.use('/users', users)

module.exports = router