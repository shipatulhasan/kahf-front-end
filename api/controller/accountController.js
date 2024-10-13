import {
  createToken,
  passEncryption,
  passwordDecryption,
  setCookie
} from '../helper/helper-func.js'
import User from '../model/User.js'

export const createUser = async (req, res, next) => {
  try {
    const { email_address, password } = req.body
    const existing = await User.findOne({ email_address })
    if (existing)
      return res.status(400).json({ message: 'User already exist!!' })
    const encryptPass = passEncryption(password)
    const user = new User({
      first_name: '',
      last_name: '',
      profile_picture: '',
      email_address,
      password: encryptPass
    })
    const token = createToken(email_address)
    setCookie(res, token)
    await user.save()
    res.status(201).json({
      status: 201,
      message: 'Data inserted successfully',
      user
    })
  } catch (error) {
    next(error)
  }
}
export const verifyLogin = async (req, res, next) => {
  try {
    const { email_address, password } = req.body
    const user = await User.findOne({ email_address })
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' })

    const isMatch = passwordDecryption(user.password) == password
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = createToken(email_address)
    setCookie(res, token)
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    next(error)
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email_address: req.user }).select(
      '-password'
    )
    res.status(200).json({
      status: 200,
      message: 'Success',
      user
    })
  } catch (error) {
    next(error)
  }
}
export const updateUser = async (req, res, next) => {
  try {
    const inputs = req.body
    const updatedUser = await User.findOneAndUpdate(
      { email_address: req.user },
      { $set: inputs },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    next(error)
  }
}
export const logoutUser = (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}
