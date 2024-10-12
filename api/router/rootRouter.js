import accountRouter from './accountRouter.js'

const rootRouter = (app) => {
  app.use('/api/account', accountRouter)
}
export default rootRouter
