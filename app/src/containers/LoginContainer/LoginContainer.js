import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ReactComponent from '../../components/Login/'
import { loginActionCreator } from '../../actions/'

export default connect(
    state => ({ auth: state.auth }),
    dispatch => ({
        onLogin: (username, password) => {
            return e => {
                e.preventDefault()
                dispatch( loginActionCreator({ username, password }) )
            }
        }
    })
)(ReactComponent)