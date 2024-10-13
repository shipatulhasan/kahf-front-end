import { Router } from 'express'
import { addLinks, getLinks } from '../controller/linkController.js'

const linkRouter = Router()
linkRouter.route('/').put(addLinks).get(getLinks)
export default linkRouter
