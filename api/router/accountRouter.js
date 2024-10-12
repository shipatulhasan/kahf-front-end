import { Router } from 'express'
import { createUser, getUser } from '../controller/accountController.js'

const accountRouter = Router()
accountRouter.route('/').get(getUser).post(createUser)
export default accountRouter
