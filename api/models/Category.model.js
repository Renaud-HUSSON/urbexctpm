module.exports = (sequelize, Sequelize) => {
  const Categorie = sequelize.define('categorie', {
    titre: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Categorie
}