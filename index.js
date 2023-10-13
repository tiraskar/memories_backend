import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import 'express-async-errors'

import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import connectDB from './database/dbConnection.js'

import postRoutes from './routes/postRoutes.js'

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
app.use(express.json())

//routers
import authRoutes from './routes/authRoutes.js'

//middleware
import notfoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use('/posts', postRoutes)
app.use('/auth', authRoutes)

const port = process.env.PORT || 5000

app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)
app.get('/', (req, res) => {
  res.send('Hello k xa there')
})
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server started at port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
