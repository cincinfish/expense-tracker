const express = require('express')
const router = express.Router()
const recordController = require('../../controller/record-controller')
// create
router.get('/new', recordController.getCreatePage)
router.post('/', recordController.createRecord)
//edit 
router.get('/:id/edit', recordController.getEditPage)
router.put('/:id', recordController.editRecord)
//delate
router.delete('/:id', recordController.deleteRecord)

module.exports = router