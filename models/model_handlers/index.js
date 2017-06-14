const fs = require('fs-extra')
const path = require('path')

module.exports = (db) => {
    let methods = {}

    fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf(".") !== 0) && (file !== 'index.js'))
        .forEach(file => Object.assign(methods, require(path.join(__dirname, file))(db)))

    return methods
}