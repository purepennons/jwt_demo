const HttpStatus = require('http-status')

const errCode = require('../../constants/error_code')

exports.res_formatter = (pattern) => {
    const regx = new RegExp(pattern)
    
    return async (ctx, next) => {    
        let isURLMatched = regx.exec(ctx.originalUrl)
        if(!isURLMatched) return ctx.status = HttpStatus.NOT_FOUND
        const api_version = isURLMatched[0].slice(1, isURLMatched[0].length - 1)

        try {
            // skip pre-process, run routes first
            await next()
        } catch (err) {
            if (isURLMatched) {
                ctx.status = HttpStatus.OK
                ctx.body = {
                    apiVersion: api_version,
                    code: (err.code)? err.code: errCode['ErrorCodeUnknowError'],
                    message: (err.code)? err.message: errCode[errCode['ErrorCodeUnknowError']]
                }
            }

            // skip thowing out for logging
            throw err
        }

        // success response
        // the default value of ctx.status of koa-router is 404 when no routes are matched,
        // so if the status of the route is 404, that mean the route is not match or data not found
        if (isURLMatched && ctx.status !== HttpStatus.NOT_FOUND) {
            ctx.status = HttpStatus.OK
            if (ctx.body) {
                ctx.body = {
                    data: ctx.body
                }
            }
            ctx.body = Object.assign({}, {
                apiVersion: api_version,
                code: errCode['ErrorCodeSuccess'],
                message: errCode[errCode['ErrorCodeSuccess']]
            }, ctx.body)
        }
    }
}