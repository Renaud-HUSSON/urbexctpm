const adminRoute = (req, _res, next) => {
  req.headers.role = 'admin'
  next()
}

module.exports = adminRoute