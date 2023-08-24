const Router = require('express')
const router = new Router()
const workerController = require('../Controllers/workerController')

router.get('/add', workerController.add)
router.get('/get', workerController.get)
router.get('/delete', workerController.delete)
router.get('/update', workerController.update)
router.get('/getRoles', workerController.getRoles)


module.exports = router