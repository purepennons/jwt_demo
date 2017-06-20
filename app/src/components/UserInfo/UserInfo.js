import React from 'react'

const ReactComponent = ({ userInfo }) => {
    return (
        <div>
            <h1>Hello, {userInfo.username}</h1>
            <p>Your ID is {userInfo.id}</p>
        </div>
    )
}

export default ReactComponent