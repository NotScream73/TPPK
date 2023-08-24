const Router = require('express')
const router = new Router()
const techAspectController = require('../Controllers/techAspectController')

router.get('/add', techAspectController.add)
router.get('/get', techAspectController.get)
router.get('/delete', techAspectController.delete)
router.get('/update', techAspectController.update)

module.exports = router