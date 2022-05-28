const { User } = require('../models')
const { comparedPassword } = require('../helpers/password-helpers')
const { generateToken } = require('../helpers/token-helper')



class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = { name, email, password }

      await User.create(newUser)
      res.status(201).json({ status: true, message: "Successfully Added User" })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } })
      // if (!user) res.status(404).json({ message: 'Email address is not exists' })
      // else {
      //   if (user && comparedPassword(password, user.password)) {
      //     const access_token = generateToken({ id: user.id, email: user.email, name: user.name })
      //     res.status(200).json({ status: true, access_token })
      //   } else {
      //     next({ msg: "Invalid email or password" })
      //   }
      // }
      if (user) {
        res.status(200).json({ status: true })
      } else {
        next({ msg: "Email address is not exists" })
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = UserController