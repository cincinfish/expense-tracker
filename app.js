const express = require('express')
const app = express()
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', 
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})