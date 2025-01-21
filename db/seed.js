//this file is responsible for adding(seeding) data to our database for development purposes

//we need mongoose model
//we need oto use monngoos to connect to mongo db
//we need a data file to seed our data
import mongoose from "mongoose"
import Suggestion from '../models/suggestion.js'
import suggestions from '../data.js'
async function seed() {
//this function should seed our datbase


await mongoose.connect('mongodb://127.0.0.1:27017/suggestions-db')

const newSuggestions = await Suggestion.create(suggestions)
console.log('seeding')

//**this clear the database:
//await mongoose.connection.db.dropDatabase()

await mongoose.disconnect()
}

seed()