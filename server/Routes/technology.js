const Router = require('express')
const router = new Router()
const technologyController = require('../Controllers/technologyController')

router.get('/add', technologyController.add)
router.get('/get', technologyController.get)
router.get('/delete', technologyController.delete)
router.get('/update', technologyController.update)

module.exports = router