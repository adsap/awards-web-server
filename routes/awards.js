const router = require('express').Router()
const AwardController = require('../controllers/AwardController')
const { authentication } = require('../middlewares/auth')

// router.use(authentication)
router.get('/', AwardController.getAll)

module.exports = router