const Router = require('express')
const router = new Router()
const roleController = require('../Controllers/roleController')

router.get('/add', roleController.add)
router.get('/get', roleController.get)
router.get('/delete', roleController.delete)
router.get('/update', roleController.update)

module.exports = router