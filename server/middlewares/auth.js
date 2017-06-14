const errCode = require('../../constants/error_code')
const jwt = require('../../lib/auth')

exports.checkAuth = () => {
    return async (ctx, next) => {
        const secret_str = ctx.secret_str

        // get token by header or query string
        const { authorization } = ctx.headers

        let token = undefined
        if (authorization) {
            const splited_auth = authorization.split(' ')
            if (splited_auth.length !== 2) throw errCode.getError('ErrorCodeParameterInvalid')
            if (splited_auth[0] !== 'Bearer') throw errCode.getError('ErrorCodeParameterInvalid')
            token = splited_auth[1]
        } else {
            token = ctx.query['token']
        }

        if(!token) throw errCode.getError('ErrorTokenInvalidOrExpired')
        
        try {
            const token_info = jwt.verify(token, secret_str)
            ctx.token_info = Object.assign({}, token_info, token)
            await next()
        } catch (err) {
            throw errCode.getError('ErrorTokenInvalidOrExpired')
        }
    }
}