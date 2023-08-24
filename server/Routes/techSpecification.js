const Router = require('express')
const router = new Router()
const techSpecificationController = require('../Controllers/techSpecificationController')

router.get('/add', techSpecificationController.add)
router.get('/get', techSpecificationController.get)
router.get('/delete', techSpecificationController.delete)
router.get('/update', techSpecificationController.update)

module.exports = router