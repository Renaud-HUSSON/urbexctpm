module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  try {
    Role.create({ id: 1, nom: "user" })
    Role.create({ id: 2, nom: "admin" })
  }catch(e){}
  
  return Role
}