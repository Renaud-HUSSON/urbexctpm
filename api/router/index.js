const multer  = require('multer')()

const Router = app => {
  app.use(`${process.env.API_BASE_URL}/users`, multer.single('image'), require('./users.router'))
  app.use(`${process.env.API_BASE_URL}/categories`, multer.single('image'), require('./categories.router'))
  app.use(`${process.env.API_BASE_URL}/images`, multer.single('image'), require('./images.router'))
  app.use(`${process.env.API_BASE_URL}/auth`, multer.single('image'), require('./auth.router'))
  app.use(`${process.env.API_BASE_URL}/roles`, multer.single('image'), require('./roles.router'))
  app.use(`${process.env.API_BASE_URL}/newsletter`, multer.single('image'), require('./newsletter.router'))
}

module.exports = Router