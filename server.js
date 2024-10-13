import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './api/middleware/handle-error.js'
import rootRouter from './api/router/rootRouter.js'
const port = process.env.PORT || 5000
const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from node'
  })
})

app.use(express.json({ limit: '50mb' }))
try {
  mongoose.connect(
    'mongodb+srv://kalf_db:NsRDAP2JDSRb5yx9@cluster0.0vh6mry.mongodb.net/kalf-profile'
  )
  console.log('Connected to database.')
} catch (error) {
  console.log('Unable to connect mongodb', error.message)
}
rootRouter(app)
app.use(errorHandlerMiddleware)

app.listen(port, () => console.log(`Server running on ${port}`))
