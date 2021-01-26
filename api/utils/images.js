const fs = require('fs')

/**
 * 
 * @param {Object} image - Image obtained from the multipart/form-data
 * @param {String} path - Path we want to upload the image to
 */
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

/**
 * Deletes one or several images from the server
 * 
 * @param {String[]} paths - Array of images paths
 */
exports.deleteImage = (paths) => {
  return new Promise((resolve, reject) => {
    //Loops through paths and delete the images associated
    paths.forEach(path => {
      //Verify that the file exists to prevent error
      fs.access(`${__dirname}/..${path}`, err => {
        if(!err) fs.unlink(`${__dirname}/..${path}`, err => {
          if(err) reject({
            success: false,
            message: `Une erreur est survenue lors de la suppresion de l'image: ${err}`
          })
        })
      })
    })
    
    resolve({
      success: true,
      message: paths.length === 1 ? "L'image a bien été supprimée" : "Les images ont bien été supprimés"
    })
  })
}