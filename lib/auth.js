const R = require('ramda')
const crypto = require('crypto')
const moment = require('moment')
const base64url = require('base64url')

const HASH_ALGORITHM = {
    hs256: 'sha256'
}

const ERROR_INVALID_TOKEN = new Error('invalid token')

const sign = (payload = {}, secret = '', alg = 'hs256', options = {}) => {
    // header
    const _header = base64url.encode(JSON.stringify({
        alg: alg.toUpperCase(),
        typ: 'JWT'
    }))

    // payload
    const timeout = R.prop('timeout', options) || 3600
    const jwt_fields = R.pick(['iss', 'sub', 'aud', 'nbf', 'iat', 'jti'], options)
    
    if (!jwt_fields['exp']) jwt_fields['exp'] = moment().unix() + timeout

    payload = Object.assign({}, jwt_fields, payload)
    const _payload = base64url.encode(JSON.stringify(payload))

    // signature
    const hmac = crypto.createHmac(HASH_ALGORITHM[alg], base64url.encode(secret))
    const _signature = hmac.update(`${_header}.${_payload}`).digest('hex')

    return `${_header}.${_payload}.${_signature}`
}

const parse = (token) => {
    const parsed = token.split('.')
    if (parsed.length !== 3) throw ERROR_INVALID_TOKEN
    
    return {
        header: parsed[0],
        payload: parsed[1],
        signature: parsed[2]
    }
}

const isValid = (token = '', secret = '') => {
    try {
        const token_obj = parse(token)
        const header_obj = JSON.parse(base64url.decode(token_obj['header']))
        
        if(!header_obj['alg']) return false
        const alg = header_obj['alg'].toLowerCase()
        
        // re-signature
        const hmac = crypto.createHmac(HASH_ALGORITHM[alg], base64url.encode(secret))
        const re_signature = hmac.update(`${token_obj['header']}.${token_obj['payload']}`).digest('hex')

        // compare
        return token_obj['signature'] === re_signature
    } catch (err) {
        return false
    }
}

const isExpired = (token = '') => {
    try {
        const token_obj = parse(token)
        const payload = JSON.parse(base64url.decode(token_obj['payload']))
        
        if (!payload['exp']) return true

        return moment().unix() > payload['exp']
    } catch (err) {
        return true
    }
}

const verify = (token = '', secret = '') => {
    // only check validation and timeout
    if (!isValid(token, secret)) throw ERROR_INVALID_TOKEN
    if (isExpired(token)) throw ERROR_INVALID_TOKEN

    // return verify payload
    return decode(token)
}

const decode = (token = '') => {
    const token_obj = parse(token)
    return JSON.parse( base64url.decode(token_obj['payload']) )
}

module.exports = {
    sign,
    isValid,
    isExpired,
    verify,
    decode,
}