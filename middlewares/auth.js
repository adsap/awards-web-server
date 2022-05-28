const { User } = require('../models')
const { verifyToken } = require('../helpers/token-helper')


const authentication = async (req, res, next) => {
  try {
    const decode = verifyToken(req.headers.access_token)
    const user = await User.findByPk(+decode.id)
    if (user) {
      req.logginUser = { id: user.id, email: user.email, name: user.name }
      next()
    } else {
      next(err)
    }
  } catch (err) {
    next(err)
  }

};

module.exports = { authentication };



