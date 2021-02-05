module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define('location', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Location
}