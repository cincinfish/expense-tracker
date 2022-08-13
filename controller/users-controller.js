const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const usersController = {
  loginPage: (req, res, next) => {
    try {
      res.render('login')
    } catch (err) {
      next(err)
    }
  },
  registerPage: (req, res, next) => {
    try {
      res.render('register')
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const errors = []
      if (!email || !password || !confirmPassword) {
        errors.push({ msg: 'Email and password are required!' })
      }
      if (password !== confirmPassword) {
        errors.push({
          msg: 'Password and confirm password does not match!'
        })
      }
      if (errors.length) {
        return res.render('register', {
          errors, name, email, password, confirmPassword
        })
      }
      const user = await User.findOne({ email })
      if (user) {
        errors.push({ msg: 'User already exists.' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({
        name,
        email,
        password: hash
      })
      res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  logout: async (req, res, next) => {
    try {
      req.logout()
      req.flash('success_msg', 'You have been successfully logged out!')
      res.redirect('/users/login')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = usersController