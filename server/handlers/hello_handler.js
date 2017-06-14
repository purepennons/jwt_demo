exports.helloHandler = async (ctx, next) => {
    const db = ctx.db
    ctx.body = 'Hello World'
    await next()
}