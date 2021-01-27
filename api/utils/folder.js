const fs = require('fs')

/**
 * Verify the existence of a folder, if it doesn't exist, it tries to create it
 * 
 * @param {String} path - Path to a folder 
 * 
 * @return {Promise} - Returns a promise that will be rejected if an error occured while creating the folder
 */
exports.verifyAndCreateFolder = (path) => {
  return new Promise((resolve, reject) => (
    fs.access(path, err => {
      if(err){
        return fs.mkdir(path, { recursive: true }, err => {
          if(err) return reject({
            success: false,
            message: `Une erreur est survenue lors de la création du dossier: ${err}`
          })

          return resolve()
        })
      }

      return resolve()
    }) 
  ))
}