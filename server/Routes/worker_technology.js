const Router = require('express')
const router = new Router()
const worker_technologyController = require('../Controllers/worker_technologyController')

router.get('/add', worker_technologyController.add)
router.get('/get', worker_technologyController.get)
router.get('/delete', worker_technologyController.delete)
router.get('/update', worker_technologyController.update)

module.exports = router