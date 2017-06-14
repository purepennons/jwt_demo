const Router = require('koa-router')
const router = Router()

const auth_mid = require('../middlewares/auth')
const users_handler = require('../handlers/users_handler')


router
    .use(auth_mid.checkAuth())    
    .get('/:userID', users_handler.getUserInfo)

module.exports = router