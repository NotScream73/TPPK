const Router = require('express')
const router = new Router()
const usersController = require('../Controllers/usersController')

router.get('/add', usersController.add)
router.get('/get', usersController.get)
router.get('/delete', usersController.delete)
router.get('/update', usersController.update)

module.exports = router