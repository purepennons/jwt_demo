const Router = require('koa-router')
const router = Router()

const hello_routes = require('./hello')
const auth_routes = require('./auth')
const users_routes = require('./users')

router
    .use('/v1/hello', hello_routes.routes(), hello_routes.allowedMethods())
    .use('/v1/auth', auth_routes.routes(), auth_routes.allowedMethods())
    .use('/v1/users', users_routes.routes(), users_routes.allowedMethods())

module.exports = router