module.exports = (sequelize, Sequelize) => {
  const CarouselImage = sequelize.define('carousel', {}, {
    freezeTableName: true
  })

  return CarouselImage
}