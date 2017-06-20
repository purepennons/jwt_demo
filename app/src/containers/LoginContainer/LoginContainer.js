import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ReactComponent from '../../components/Login/'
import { loginAction } from '../../actions/'
import { login } from '../../handlers/auth'

// class LoginContainer extends Component {
//     render() {
//         // const { auth } = this.props;
//         console.log('props', this.props)
//         return (
//             <ReactComponent {...this.props} />
//         );
//     }
// }    

export default connect(
    state => ({ auth: state.auth }),
    dispatch => ({
        onLogin: (username, password) => {
            return e => {
                e.preventDefault()
                login({ username, password })
                    .then(result => {
                        if (result.code === 2000000) {
                            dispatch(loginAction({
                                isLogin: true,
                                token: result.data.token,
                                userInfo: {
                                    id: result.data.user_id,
                                    username: result.data.username
                                },
                                validation: {}
                            }))
                        } else {
                            dispatch(loginAction({
                                isLogin: false,
                                token: '',
                                userInfo: {},
                                validation: {
                                    isCorrect: false
                                }
                            }))
                            dispatch(push('/'))
                        }
                    })
                    .catch(err => console.error(err))
            }
        }
    })
)(ReactComponent)