const Router = require('koa-router')
const router = Router()

const hello_handler = require('../handlers/hello_handler')

router
    .get('/sayhi', hello_handler.helloHandler)

module.exports = router