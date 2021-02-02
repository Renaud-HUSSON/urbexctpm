module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define('location', {
    lat: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lng: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Location
}