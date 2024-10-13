import { Router } from 'express'
import {
  createUser,
  getUser,
  logoutUser,
  updateUser,
  verifyLogin
} from '../controller/accountController.js'
import { requestAuth } from '../middleware/request-auth.js'

const accountRouter = Router()
accountRouter.route('/').get(requestAuth, getUser).put(requestAuth, updateUser)
accountRouter.route('/create-user').post(createUser)
accountRouter.route('/login').post(verifyLogin)
accountRouter.route('/logout').post(logoutUser)
export default accountRouter
