const { verifyAccessToken, verifyRefreshTokenAndCreateAccessToken, generateRefreshToken } = require("../utils/token")

const authenticate = async (req, res, role) => {
  const refreshToken = req.cookies.refresh_token
  const accessToken = req.cookies.access_token
  
  if(!accessToken && !refreshToken) throw new Error()

  if(accessToken){
    try {
      const verifiedAccessToken = verifyAccessToken(accessToken)

      //Throw an error if the role isn't the one given as parameter
      if(verifiedAccessToken.role !== role && verifiedAccessToken.role !== 'admin'){
        throw new Error()
      }

      req.userRole = verifiedAccessToken.role
      
      return verifiedAccessToken
    }catch(err){
      if(!refreshToken) throw new Error()
    }
  }
  
  const generatedAccessToken = await verifyRefreshTokenAndCreateAccessToken(refreshToken, role)
  
  res.cookie('access_token', generatedAccessToken)
}

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = await authenticate(req, res, 'user')
    req.userid = token.sub
    next()
  }catch(_err){
    return res.status(403).send({
      success: false,
      message: "Vous n'êtes pas autorisé à accèder à cetter ressource"
    })
  }
}

exports.authenticateAdmin = async (req, res, next) => {
  try {
    await authenticate(req, res, 'admin')
    next()
  }catch(err){
    return res.status(403).send({
      success: false,
      message: "Vous n'êtes pas autorisé à accèder à cetter ressource"
    })
  }
}

