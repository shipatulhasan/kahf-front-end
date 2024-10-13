import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
export const createToken = (user) => {
  return jwt.sign({ user }, 'eb8035fc3d727419045e83dab614eff57c79e10d', {
    expiresIn: '1d'
  })
}
export const setCookie = (res, token) => {
  res.cookie('token', token)
}

export const passwordDecryption = (data) => {
  const password = CryptoJS.AES.decrypt(
    data,
    '9c710ba54fd58e18faa095dac9fa069e97dae2ff'
  ).toString(CryptoJS.enc.Utf8)
  return password
}
export const passEncryption = (data) => {
  const newPassword = CryptoJS.AES.encrypt(
    data,
    '9c710ba54fd58e18faa095dac9fa069e97dae2ff'
  ).toString()
  return newPassword
}
