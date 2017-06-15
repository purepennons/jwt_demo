const log = require('log4js').getLogger('app:koa')
const Koa = require('koa')
const cors = require('kcors')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const prettyJSON = require('koa-json')

const errCode = require('../constants/error_code')
const res_mid = require('./middlewares/response')
const router = require('./routes/')


const default_ops = {}

module.exports = async (ops, db) => {
    ops = Object.assign(default_ops, ops)

    const app = new Koa()

    // shared context
    app.context.ops = ops
    app.context.db = db
    app.context.secret_str = 'Facebook is the future [By Roth Peng]'
    app.context.dummy_users = [
        {
            id: 1,
            username: 'akiya',
            password: 'abc123'
        }
    ]
    
    // middlewares
    app.use(logger())
    app.use(cors())
    app.use(bodyParser())
    app.use(prettyJSON( { pretty: false, param: 'pretty' } ))
    app.use(static('./public'))

    // middleware error handling
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            log.error('koa#middlewares', err.stack, JSON.stringify(ctx))
        }
    })

    // json format response formatter (before routing)
    // route need to start with /v[number]/
    app.use(res_mid.res_formatter(/^\/v(\d+)\//))
    
    // routes
    app.use(router.routes())

    app.on('error', (err, ctx) => log.error('koa#excpetion', err.stack, ctx))

    return app
}