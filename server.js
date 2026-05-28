import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import templateRoutes from './routes/templateRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/templates', templateRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')
    app.listen(5000, () => console.log('Server running on http://localhost:5000'))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
