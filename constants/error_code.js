/*

custom error code

http status code + category + serial number

xxx 00 xx General

*/

let e = {}

const code = {
    // 200 00
    ErrorCodeSuccess: 2000000,

    // 400 00
    ErrorCodeBadRequest: 4000000,
    ErrorCodeParameterInvalid: 4000001,
    ErrorCodeAuthenticationInvalid: 4000002,
    ErrorCodeNoPermission: 4000003,
    ErrorTokenInvalidOrExpired: 4000004,

    // 500 00
    ErrorCodeInternalServer: 5000000,
    ErrorCodeStartupFailed: 5000001,
    ErrorJSONParsingFailed: 5000002,

    ErrorCodeUnknowError: 5000099,
}

let code_msg = {}
// 200 00
code_msg[code.ErrorCodeSuccess] = 'success'

// 400 00
code_msg[code.ErrorCodeBadRequest] = 'bad request'
code_msg[code.ErrorCodeParameterInvalid] = 'parameter invalid'
code_msg[code.ErrorCodeAuthenticationInvalid] = 'authentication error'
code_msg[code.ErrorCodeNoPermission] = 'permission error'
code_msg[code.ErrorTokenInvalidOrExpired] = 'token was invalid or expired'

// 500 00
code_msg[code.ErrorCodeInternalServer] = 'internal server error'
code_msg[code.ErrorCodeStartupFailed] = 'initial the process failed'
code_msg[code.ErrorJSONParsingFailed] = 'parsing JSON error'

code_msg[code.ErrorCodeUnknowError] = 'unknow server error'

// methods
e.getError = (msg) => {
    let err = null
    if (code[msg]) { 
        err = new Error(code_msg[code[msg]])
        err.code = code[msg]
    } else {
        err = new Error(code_msg[code['ErrorCodeUnknowError']])
        err.code = code['ErrorCodeUnknowError']
    }
    return err
}

module.exports = Object.assign(e, code, code_msg)