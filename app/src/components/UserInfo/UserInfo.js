import React from 'react'
import { Redirect } from 'react-router'

const ReactComponent = ({ auth }) => {
    const { isLogin } = auth
    const userInfo = auth.userInfo
    if (!isLogin) {
        return (
            < Redirect to= "/login" />
        )
    } else {
        return (
            <div>
                <h1>Hello, {userInfo.username}</h1>
                <p>Your ID is {userInfo.user_id}</p>
            </div>
        )
    }
}

export default ReactComponent