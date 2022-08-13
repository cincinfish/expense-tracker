const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const usersController = require('../../controller/users-controller')
// login
router.get('/login', usersController.loginPage)
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login' }))
// register
router.get('/register', usersController.registerPage)
router.post('/register', usersController.register)

router.get('/logout', usersController.logout)
module.exports = router