import {
  createToken,
  passEncryption,
  passwordDecryption,
  setCookie
} from '../helper/helper-func.js'
import User from '../model/User.js'

export const createUser = async (req, res) => {
  try {
    const { email_address, password } = req.body
    const existing = await User.findOne({ email_address })
    if (existing) res.status(400).json({ message: 'User already exist!!' })
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
    res.status(200).json({
      status: 200,
      message: 'Data inserted successfully',
      user
    })
  } catch (err) {
    console.log(err)
  }
}
export const verifyLogin = async (req, res) => {
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
    res.status(500).json({ message: 'Server Error', error })
  }
}
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email_address: req.user }).select(
      '-password'
    )
    console.log(user)
    res.status(200).json({
      status: 200,
      message: 'Success',
      user
    })
  } catch (err) {
    console.log(err)
  }
}
export const logoutUser = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
}
