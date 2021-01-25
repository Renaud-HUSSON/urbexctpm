const Router = app => {
  app.use(`${process.env.API_BASE_URL}/users`, require('./users.router'))
  app.use(`${process.env.API_BASE_URL}/categories`, require('./categories.router'))
  app.use(`${process.env.API_BASE_URL}/images`, require('./images.router'))
  app.use(`${process.env.API_BASE_URL}/auth`, require('./auth.router'))
}

module.exports = Router