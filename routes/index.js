const router = require('express').Router()
const userRoutes = require('./users')
const awardRoutes = require('./awards')
router.use('/', userRoutes)
router.use('/awards', awardRoutes)


module.exports = router