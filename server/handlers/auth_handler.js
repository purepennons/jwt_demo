const errCode = require('../../constants/error_code')
const jwt = require('../../lib/auth')

const dummy_users = [
    {
        id: 1,
        username: 'akiya',
        password: 'abc123'
    }
]

exports.login = async (ctx, next) => {
    const db = ctx.db
    const secret_str = ctx.secret_str

    const { username, password } = ctx.headers
    if (!username || !password) throw errCode.getError('ErrorCodeParameterInvalid')
    
    // check authentication
    const matched_user = dummy_users.find(user => username === user.username && password === user.password)
    if (!matched_user) throw errCode.getError('ErrorCodeAuthenticationInvalid')
    
    const user_info = {
        user_id: matched_user['id'],
        username: matched_user['username']
    }

    const token = jwt.sign(user_info, secret_str, 'hs256', {timeout: 300})
    ctx.body = {
        token
    }
    
    await next()
}

exports.logout = async (ctx, next) => {
    const db = ctx.db
    ctx.body = 'logout'
    await next()
}