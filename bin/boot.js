// load env valuables
require('dotenv').config()

const debug = require('debug')('app:boot')
const log4js = require('log4js')
const path = require('path')
const fs = require('fs-extra')

const app_dir = path.resolve(__dirname, '..')

// setup log folder
try {
    fs.mkdirSync(path.join(app_dir, 'log'))
} catch (err) {
    debug('log folder exist.')
}

// log4js setting
log4js.configure(path.join(app_dir, 'config', 'log4js.json'))
const log = log4js.getLogger('startup')

// init and startup
const init = require('../index')
init().catch(err => log.fatal('Start up failed', err.stack))

// exit
process.on('beforeExit', err => {
    // do something before the process exits.
})

// avoid the process to crash
process.on('unhandledRejection', (reason, promise) => {
    log.fatal('unhandled promise rejection', reason)
    promise.catch(err => log.error('unhandled promise error has been handled', err))
    // log.error('unhandled promise error has been handled', err)
})
process.on('rejectionHandled', promise => {
    log.warn('Some unhandled promise are exist in the system.')
    // process keeps running
})

// handle a uncaught exception and do some post-process before the process exits or keep running.
process.on('uncaughtException', err => {
    log.fatal('uncaughtException', err.stack)
    process.exit(1)
})