import express from 'express'
import morgan from 'morgan'
import suggestions from './data.js'
import Suggestion from './models/suggestion.js'
import suggestionController from './controllers/suggestionController.js'
import userController from './controllers/userController.js'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import path from 'path'
import { fileURLToPath } from 'url';
import session from 'express-session'

import dotenv from 'dotenv'
dotenv.config() // initalises .env

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(process.cwd(), 'public')))

app.use(morgan('dev'))

app.use(methodOverride('_method'))


app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized:true,
    cookie:{
      secure:false, //is this using https?
      httoOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    }
  }))

app.use ((req, res, next) => {
  res.locals.user = req.session.user || null 
  next()
})

app.use(express.json())

app.use(express.urlencoded({extended: false}))


//have our app us ethe new suggestionController
app.use('/', suggestionController)

app.use('/', userController)
// Define routes here:




app.listen(3000, () => {
    console.log('Server is running on port 3000!')
  })


  const url = process.env.MONGODB_URI
  const dbname = 'suggestions-db'
  mongoose.connect(`${url}${dbname}`)