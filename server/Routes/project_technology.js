const Router = require('express')
const router = new Router()
const project_technologyController = require('../Controllers/project_technologyController')

router.get('/add', project_technologyController.add)
router.get('/get', project_technologyController.get)
router.get('/delete', project_technologyController.delete)
router.get('/update', project_technologyController.update)

module.exports = router