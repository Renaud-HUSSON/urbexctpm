module.exports = (sequelize, Sequelize) => {
  const Newsletter = sequelize.define('newsletter', {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
  
  return Newsletter
}