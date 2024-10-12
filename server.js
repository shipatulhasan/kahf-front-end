import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const port = process.env.PORT || 5000
const app = express()
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from node'
  })
})
app.use(cors())
app.use(express.json({ limit: '50md' }))
try {
  mongoose.connect(
    'mongodb+srv://kalf_db:NsRDAP2JDSRb5yx9@cluster0.0vh6mry.mongodb.net/kalf-profile'
  )
  console.log('Connected to database.')
} catch (error) {
  console.log('Unable to connect mongodb', error.message)
}
app.listen(port, () => console.log(`Server running on ${port}`))
