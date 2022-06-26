const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Record = require('../record')
const RecordData = require('./record.json').results
const Category = require('../category')
const db = require('../../config/mongoose')
const seedUsers = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    recordIndex: [1, 2, 3]
  },
  {
    name: '美冴',
    email: 'user2@example.com',
    password: '12345678',
    recordIndex: [4, 5]
  }
]

db.once('open', async () => {
  const categories = await Category.find().lean().then()
  RecordData.forEach(data => {
    data.categoryId = categories.find(category => data.category === category.name)._id
  })
  Promise.all(
    Array.from(seedUsers, async (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const records = RecordData.filter(item => {
            return seedUser.recordIndex.includes(item.id)
          })
          const recordSeed = []
          Promise.all(
            Array.from(records, recordIndex => {
              recordIndex.userId = userId
              recordSeed.push(recordIndex)
            })
          )
          return Record.create(recordSeed)
        })
    }))
    .then(() => {
      console.log('recordSeeder done')
      process.exit()
    })
    .catch(err => console.log(err))
}) 