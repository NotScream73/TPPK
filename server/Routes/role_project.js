const Router = require('express')
const router = new Router()
const role_projectController = require('../Controllers/role_projectController')

router.get('/add', role_projectController.add)
router.get('/get', role_projectController.get)
router.get('/delete', role_projectController.delete)
router.get('/update', role_projectController.update)

module.exports = router