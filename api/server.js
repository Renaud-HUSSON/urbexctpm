require('dotenv').config()
const express = require('express')

const app = express()

const db = require('./models/Database')
db.sequelize.sync({ force: true })

const PORT = process.env.PORT || '8081'

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})