const Sequelize = require('sequelize')

const DB_DATABASE = process.env.DB_DATABASE || 'urbex'
const DB_USERNAME = process.env.DB_USERNAME || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
const DB_HOST = process.env.DB_HOST || 'urbexdb'

const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
  }
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./User.model')(sequelize, Sequelize)
db.category = require('./Category.model')(sequelize, Sequelize)
db.images = require('./Image.model')(sequelize, Sequelize, db.category)
db.roles = require('./Role.model')(sequelize, Sequelize)
db.newsletter = require('./Newsletter.model')(sequelize, Sequelize)
db.refreshTokens = require('./RefreshToken')(sequelize, Sequelize)

db.category.hasMany(db.images, { foreignKey: 'categorieId' })
db.images.belongsTo(db.category)

db.roles.hasMany(db.users, { foreignKey: 'roleId' })
db.users.belongsTo(db.roles)

db.users.hasMany(db.refreshTokens)
db.refreshTokens.belongsTo(db.users)

module.exports = db