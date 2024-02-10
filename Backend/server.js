import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

import userRoutes from './router/userRoutes.js'
import jobRoutes from './router/jobRoutes.js'
import applicationRoutes from './router/applicationRoutes.js'

// config dotenv
dotenv.config()

// connect db
connectDB()

const app = express()

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/',
  }),
)

app.use('/api/v1/user/', userRoutes)
app.use('/api/v1/job/', jobRoutes)
app.use('/api/v1/application', applicationRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
