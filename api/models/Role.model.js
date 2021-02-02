module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  Role.create({ id: 1, nom: "user" })
  .catch(_ => {})
  Role.create({ id: 2, nom: "admin" })
  .catch(_ => {})
  
  return Role
}