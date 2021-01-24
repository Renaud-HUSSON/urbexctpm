require('dotenv').config()
const Router = require('./router/index')
const express = require('express')

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router
Router(app)

//Synchronize db tables
const db = require('./models/Database')
// db.sequelize.sync({ force: true })

const PORT = process.env.PORT || '8081'

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})