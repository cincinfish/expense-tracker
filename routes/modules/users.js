const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {

})

// register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }).then(user => {
    if (user) {

      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})
module.exports = router