const {Sequelize} = require('sequelize')


const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'Vago1610',
    database: 'skeleton',
    post: 5432
})


module.exports = {
    db
}

