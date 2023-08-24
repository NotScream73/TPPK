const Router = require('express')
const router = new Router()
const projectController = require('../Controllers/projectController')

router.get('/add', projectController.add)
router.get('/get', projectController.get)
router.get('/delete', projectController.delete)
router.get('/update', projectController.update)

module.exports = router