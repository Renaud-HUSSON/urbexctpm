require('dotenv').config()
const Router = require('./router/index')
const express = require('express')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const app = express()

//Use passport configuration
require('./auth/Strategy')(passport)
passport.initialize()

//Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router
Router(app)

//Synchronize db tables
const db = require('./models/Database')
// db.sequelize.sync({ force: true })

//Port to run the api on
const PORT = process.env.PORT || '8081'

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})