import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

import {
    LOGIN,
} from '../constants/actionTypes'

import { login } from '../handlers/auth'

// export const loginAction = createAction(LOGIN)
// export const loginPAction = createAction('LOGIN_PROMISE')

export const LOGIN_PROMISE = 'LOGIN_PROMISE'
export const loginActionCreator = ({ username, password }) => dispatch => dispatch({
    type: LOGIN_PROMISE,
    payload: login({ username, password }),
}).then(() => dispatch(push('/profile')) )