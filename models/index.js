const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")

const handlers = require('./model_handlers/')

const init_db = (config) => {
    let sequelize = new Sequelize(config.database, config.username, config.password, config)

    let db = {}

    fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf(".") !== 0) && (file !== 'index.js') && (file != 'model_handlers'))
        .forEach(file => {
            let model = sequelize.import(path.join(__dirname, file))
            db[model.name] = model
        })

    Object.keys(db).forEach(modelName => {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db)
        }
    })    


    db.sequelize = sequelize
    db.Sequelize = Sequelize
    db.methods = handlers(db)

    return db
}

module.exports = init_db