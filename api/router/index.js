const Router = app => {
  app.use(`${process.env.API_BASE_URL}/users`, require('./users.router'))
  app.use('/auth', require('./auth.router'))
}

module.exports = Router