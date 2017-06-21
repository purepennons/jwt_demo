import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import co from 'co'

// import {
//     LOGIN,
// } from '../constants/actionTypes'

import { login, validation } from '../handlers/auth'

// export const loginAction = createAction(LOGIN)
// export const loginPAction = createAction('LOGIN_PROMISE')

export const LOGIN = 'LOGIN'
export const loginActionCreator = ({ username, password }) => dispatch => {
    const no_pass_list = validation({ username, password })
    if (no_pass_list.length > 0) {
        dispatch(updateLoginValidation({ validation: no_pass_list }))
    } else {
        dispatch(postLoginActionCreator({ username, password }))
    }
}

export const updateLoginValidation = ({ validation }) => ({
    type: 'UPDATE_LOGIN_FORM_VALIDATION',
    payload: { validation }
})

export const LOGIN_PROMISE = 'LOGIN_PROMISE'
export const postLoginActionCreator = ({ username, password }) => dispatch => dispatch({
    type: LOGIN_PROMISE,
    payload: co( login({ username, password }) ),
}).then(() => dispatch(push('/profile')) )