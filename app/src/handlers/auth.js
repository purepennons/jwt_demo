const HOST = 'http://localhost:4000'

export const login = async ({ username, password }) => {
    const url = [HOST, '/v1', '/auth/login'].join('')

    try {
        const res = await fetch(url, {
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
        let json = await res.json()
        if (json.code !== 2000000) throw new Error('Failed')
        return json.data
    } catch (err) {
        console.error(err)
        throw err
    }
}
