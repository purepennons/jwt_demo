import React, { Component } from 'react'
import { Redirect, push } from 'react-router'

import { onTextChange } from '../../handlers/general'


class ReactComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input_username: '',
            input_password: '',
            isLogin: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        // if (isLogin) {
        //     console.log(isLogin)
        //     this.setState({ isLogin });
        // }
    }


    render() {
        // console.log('state', this.props)
        // if (this.props.auth.isLogin) {
        //     return (
        //         <Redirect to="/profile" />
        //     )
        // } else {
            return (
                <div>
                    <form onSubmit={this.props.onLogin(this.state.input_username, this.state.input_password)}>
                        <p>Username</p>    
                        <input type="text" onChange={onTextChange.call(this, 'input_username')} value={this.state.input_username} />
                        <p>Password</p>
                        <input type="password" onChange={onTextChange.call(this, 'input_password')} value={this.state.input_password} />
                        <input type="submit" value="Login"/>
                    </form>
                    <p>
                        {JSON.stringify(this.props.auth.validation)}
                    </p>
                </div>
            )
        // }
    }
}

export default ReactComponent