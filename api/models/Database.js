const Sequilize = require('sequelize')

const DB_DATABASE = process.env.DB_DATABASE || 'urbex'
const DB_USERNAME = process.env.DB_USERNAME || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
const DB_HOST = process.env.DB_HOST || 'urbexdb'

const sequelize = new Sequilize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
  }
)

const db = {}

db.sequelize = sequelize

module.exports = db