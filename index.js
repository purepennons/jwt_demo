// modules
const log = require('log4js').getLogger('app:init')
const path = require('path')
const http = require('http')

// custom modules
const init_db = require('./models/')
const createServer = require('./server/')
const errCode = require('./constants/error_code')

// env
// TODO: need to be filtered by a regular expression
const env = process.env.NODE_ENV || 'development'

// config
const config = require(path.join(__dirname, './config/config.json'))[env]

// init - all services and their config need to be registered in the function.
const init = async () => {
    // config parsing
    let db_config = config.db || {}
    let koa_config = config.koa || {}
    let socketio_config = config.socketio || {}
    let setting_config = config.setting || {}

    // overwrite setting by envs
    if (env === 'production') {
        db_config.port = process.env.DB_PORT || db_config.port
        db_config.database = process.env.DB_NAME || db_config.database
        db_config.username = process.env.DB_USER || db_config.username
        db_config.password = process.env.DB_PASSWD || db_config.password
    }

    koa_config.port = process.env.PORT || koa_config.port || 3000

    try {
        // start to init services
        
        // init db
        const db = init_db(db_config)
        // ping db
        await db.sequelize.authenticate()

        // set force = true will clear the data of db every time
        await db.sequelize.sync({force: false})

        // init koa
        const app = await createServer(koa_config, db)
        const server = http.createServer(app.callback()).listen(koa_config.port)
        // const server = app.listen(koa_config.port)

        return {
            db,
            app,
            server,
        }
        
    } catch (err) {
        log.error('startup', err.stack)
        throw errCode.getError('ErrorCodeStartupFailed')    
    } 
    
}

module.exports = init