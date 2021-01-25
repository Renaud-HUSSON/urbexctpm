module.exports = (sequelize, Sequelize, Category) => {
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
    },
    categorie: {
      type: Sequelize.INTEGER,
      references: {
        model: Category,
        key: 'id'
      }
    }
  })

  return Image
}