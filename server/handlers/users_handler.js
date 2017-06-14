const errCode = require('../../constants/error_code')

exports.getUserInfo = async (ctx, next) => {
    const { user_id, username } = ctx.token_info
    const { userID } = ctx.params

    if (String(userID) !== String(user_id)) throw errCode.getError('ErrorCodeNoPermission')
    
    ctx.body = {
        id: user_id,
        username,
    }

    await next()
}