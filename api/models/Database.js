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

//Models
db.users = require('./User.model')(sequelize, Sequelize)
db.category = require('./Category.model')(sequelize, Sequelize)
db.images = require('./Image.model')(sequelize, Sequelize, db.category)
db.roles = require('./Role.model')(sequelize, Sequelize)
db.newsletter = require('./Newsletter.model')(sequelize, Sequelize)
db.refreshTokens = require('./RefreshToken')(sequelize, Sequelize)
db.locations = require('./Location.model')(sequelize, Sequelize)
db.carousel = require('./Carousel.model')(sequelize, Sequelize)
db.regions = require('./Region.model')(sequelize, Sequelize)

//Associations
db.category.hasMany(db.images)
db.images.belongsTo(db.category)

db.locations.hasMany(db.images)
db.images.belongsTo(db.locations)

db.roles.hasMany(db.users)
db.users.belongsTo(db.roles)

db.users.hasMany(db.refreshTokens)
db.refreshTokens.belongsTo(db.users)

db.images.hasOne(db.carousel)
db.carousel.belongsTo(db.images)

db.regions.hasMany(db.locations)
db.locations.belongsTo(db.regions)

module.exports = db