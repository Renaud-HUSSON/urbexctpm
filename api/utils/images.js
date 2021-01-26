const fs = require('fs')

exports.uploadImage = (image, path) => {
  const uploadPath = path + image.originalname

  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/..${uploadPath}`, image.buffer, err => {
      if(err){
        return reject({
          success: false,
          message: `Une erreur est survenue lors de la mise en ligne de l'image: ${err}`
        })
      }

      resolve()
    })
  })
}