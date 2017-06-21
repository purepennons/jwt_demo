import { handleActions } from 'redux-actions'

import {AuthState} from '../../constants/models'

// export default handleActions({
//     LOGIN: (prev_state, { payload }) => ({ ...prev_state, ...payload }),
//     LOGIN_PROMISE_FULFILLED: (prev_state, { payload }) => ({...prev_state, ...payload.body})
// }, AuthState)

export default (state = AuthState, action) => {
    console.log('state', state)
    switch (action.type) {
        case 'LOGIN_PROMISE_FULFILLED':
            console.log('LOGIN_PROMISE_FULFILLED')
            const userInfo = { ...action.payload }
            return { ...state, userInfo, isLogin: true, token: userInfo.token}
        case 'LOGIN_PROMISE_REJECTED':
            console.log('LOGIN_PROMISE_REJECTED')    
            return state
        case 'LOGIN_PROMISE_PENDING':
            console.log('LOGIN_PROMISE_PENDING')    
            return state
        case 'UPDATE_LOGIN_FORM_VALIDATION':
            console.log('UPDATE_LOGIN_FORM_VALIDATION')    
            return {...state, ...action.payload}
        default:
            return state
    }
}