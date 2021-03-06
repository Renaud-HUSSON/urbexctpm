module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define('region', {
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  Region.create({ id: 1, nom: "Occitanie" }).catch(() => {})
  Region.create({ id: 2, nom: "Provence-Alpes-Côte-D'Azur" }).catch(() => {})
  Region.create({ id: 3, nom: "Nouvelle-Aquitaine" }).catch(() => {})
  Region.create({ id: 4, nom: "Auvergne-Rhônes-Alpes" }).catch(() => {})
  Region.create({ id: 5, nom: "Pays-De-La-Loire" }).catch(() => {})
  Region.create({ id: 6, nom: "Centre-Val-De-Loire" }).catch(() => {})
  Region.create({ id: 7, nom: "Bourgogne-Franche-Compté" }).catch(() => {})
  Region.create({ id: 8, nom: "Bretagne" }).catch(() => {})
  Region.create({ id: 9, nom: "Normandie" }).catch(() => {})
  Region.create({ id: 10, nom: "Île-De-France" }).catch(() => {})
  Region.create({ id: 11, nom: "Grand-Est" }).catch(() => {})
  Region.create({ id: 12, nom: "Hauts-De-France" }).catch(() => {})
  Region.create({ id: 13, nom: "Corse" }).catch(() => {})
  
  return Region
}