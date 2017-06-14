const Router = require('koa-router')
const router = Router()

const hello_routes = require('./hello')

router
    .use('/v1/hello', hello_routes.routes(), hello_routes.allowedMethods())

module.exports = router