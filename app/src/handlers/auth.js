import co from 'co'

const HOST = 'http://localhost:4000'

export const validation = function ({ username, password }) {
    try {
        let no_pass = []
        if (!username) no_pass.push('NO_USERNAME')
        if (username.length < 3) no_pass.push('USERNAME_TOO_SHORT')
        if (!password) no_pass.push('NO_PASSWORD')
        if (password.length < 6) no_pass.push('PASSWORD_TOO_SHORT')
        
        return no_pass
    } catch (err) {
        throw err
    }
}

export const login = function* ({ username, password }) {
    const url = [HOST, '/v1', '/auth/login'].join('')

    try {
        const res = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (res.status !== 200) throw new Error('bad request')
        let json = yield res.json()
        if (json.code !== 2000000) throw new Error('Failed')
        return json.data
    } catch (err) {
        console.error(err)
        throw err
    }
}
