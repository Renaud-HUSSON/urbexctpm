const fs = require('fs')
const sharp = require('sharp');
const { verifyAndCreateFolder } = require('./folder');

/**
 * Uploads an image to a folder & generates a thumbnail
 * 
 * @param {Object} image - Image obtained from the multipart/form-data
 * @param {String} path - Path we want to upload the image to
 */
exports.uploadImage = (image, path) => {
  const uploadPath = path + image.originalname
  
  return new Promise(async (resolve, reject) => {
    //Resize the image to a certain width
    try {
      await resizeImage(image, `${__dirname}/..${path}thumbnails/`)
    }catch(e){
      return reject(e)
    }

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
 * @param {Object} image - Image obtained from the multipart/form-data
 * @param {String} path - Folder's path we want to upload the image to
 */
resizeImage = (image, path, width=350) => {
  return new Promise(async (resolve, reject) => {
    //Verify that the folder given by path exists, if not it tries to create it
    try {
      await verifyAndCreateFolder(path)
    }catch(e){
      return reject(e) 
    }

    sharp(image.buffer)
    .resize(width)
    .withMetadata()
    .toFile(path + image.originalname, (err, info) => {
      if(err){
        return reject({
          success: false,
          message: `Une erreur est survenue lors du redimensionnement de l'image: ${err}`
        })
      }

      return resolve()
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