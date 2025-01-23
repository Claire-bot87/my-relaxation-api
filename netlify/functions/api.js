import express from 'express'
import morgan from 'morgan'
//import suggestions from './data.js'
//import Suggestion from './models/suggestion.js'
import suggestionController from '../../controllers/suggestionController.js'
import userController from '../../controllers/userController.js'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import path from 'path'
import { fileURLToPath } from 'url';
import session from 'express-session'

import MongoStore from 'connect-mongo'

import serverless from 'serverless-http'

import dotenv from 'dotenv'
dotenv.config() // initalises .env

mongoose.connect(process.env.MONGODB_URI)

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(process.cwd(), 'public')))

app.use(morgan('dev'))

app.use(methodOverride('_method'))


app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:true,
    cookie:{
      secure:false, 
      httoOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },

  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
}),
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




export const handler = serverless(app)


  const url = 'mongodb://127.0.0.1:27017/'
  const dbname = 'suggestions-db'
  mongoose.connect(`${url}${dbname}`)