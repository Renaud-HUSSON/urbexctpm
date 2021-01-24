const Router = app => {
  app.use('/api/users', require('./users'))
}

module.exports = Router