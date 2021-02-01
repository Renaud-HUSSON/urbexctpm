module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define('image', {
    titre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chemin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  return Image
}