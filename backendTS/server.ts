import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db'
import appError from './middlewares/errorMiddleware'
import compression from 'compression'
import cors from 'cors'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

import expense from './routes/expenseRoutes'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Compress all HTTP responses
app.use(compression())

app.use(express.json())

// Static folder
app.use(express.static(`${__dirname}/public`))

// import rutes
app.use('/api/v1/expense', expense)

app.use(appError)

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () =>
  console.log(
    `Server pokrenut u ${process.env.NODE_ENV} modu, na portu ${PORT}`
  )
)
