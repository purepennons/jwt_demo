const Router = require('koa-router')
const router = Router()

const auth_handler = require('../handlers/auth_handler')


router
    .post('/login', auth_handler.login)
    .post('/logout', auth_handler.logout)

module.exports = router