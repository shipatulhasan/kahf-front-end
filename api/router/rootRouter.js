import { requestAuth } from '../middleware/request-auth.js'
import accountRouter from './accountRouter.js'
import linkRouter from './linkRouter.js'

const rootRouter = (app) => {
  app.use('/api/account', accountRouter)
  app.use('/api/links', requestAuth, linkRouter)
}
export default rootRouter
