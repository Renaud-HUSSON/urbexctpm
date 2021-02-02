module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define('refreshToken', {
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return RefreshToken
}