import express from 'express'
import morgan from 'morgan'
import suggestions from './data.js'
import Suggestion from './models/suggestion.js'
import suggestionController from './controllers/suggestionController.js'
import mongoose from 'mongoose'
const app = express()
app.use(morgan('dev'))

app.use(express.json())
// Define routes here:

//have our app us ethe new suggestionController
app.use('/', suggestionController)

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });
  

  app.get('/home', (req, res) => {
    res.send('<h1>Home page!</h1>');
  });

  app.get('/hello', (req, res) => {
    // Accessing query parameters from the request
    const name = req.query.name;
    const age = req.query.age;

    // Using the query parameters to customize the response
    res.send(`Hello there, ${name}! I hear you are ${age} years old!`);
});



app.get('/greet/:name', (req, res) =>{
    console.log(req.params.name)
    
    res.send(`hello ${req.params.name}`)
    })

//     app.get('/suggestions', async function (req,res) => {
//         const allSuggestions = await suggestion.find()
// res.send(allSuggestions)
//     })
    
// app.get('/suggestions/:name', function(req,res) {
//     const suggestionName = req.params.name

//     const suggestion = suggestions.filter((currentSuggestion) =>{
  
//     return currentSuggestion === suggestionName
// })
//     res.send(suggestion)

// })

app.get('/suggestions/:name', function(req,res) {
    console.log(req.params.name)
    const suggestionName = req.params.name
    const suggestion = suggestions.find((currentSuggestion) => {
        return currentSuggestion.name === suggestionName
    })
res.send(suggestion)
})


// app.get('/suggestions', function(req,res){
//     res.send(suggestions)
// })

//**this is the post mongodb version: */
// app.get('/suggestions', async function(req,res){
//     console.log("RUNNING MY POST MONGO DB CODE")
//     const suggestions = await Suggestion.find()
//     res.send(suggestions)
//   })


//** this is the post mongo db version */
// app.get('/suggestion/:_id', async function(req,res){
//     console.log('RUNNING AFTER MONGO DB GET BY ID CODE')
//     const suggestion = await Suggestion.findById(req.params._id)
//     res.send(suggestion)
// })

  app.get('/:itemNumber', (req, res) => {
    // Accessing the parameter
    console.log(req.params.itemNumber);  // Output could be 123, 456, etc.
  console.log(req.params)

    // Sending a response with the parameter
    res.send(`<h1>Item ${req.params.itemNumber}</h1>`);
  });
  


//need to re add lines 88 - 99

//   app.post('/suggestions', (req,res) =>{
// const newSuggestion = req.body
// suggestions.push(newSuggestion)
// res.send(suggestions)
//   })



//**this is the post-mongo db version: */
// app.post('/suggestions', (req,res) =>{
//     const newSuggestion = req.body
// Suggestion.create(newSuggestion)
// res.status(201).send(newSuggestion)
// })

//   app.post('/suggestion', async function(req, res) {
//   // Get the new destination from the body of request
//   const newSuggestion = await Suggestion.create(req.body)
//   // Send back our destination with appropriate status code.
//   res.status(201).send(newSuggestion)
// })


// //of course you could laos do delete by id, this won't work because i haven't imported Suggestion from model

//**this is the post-mongo db version: */
// app.delete('/suggestions/:_id', async function(req,res) {
//     console.log('RUNNING POST MONGO DB CODE')
//     const suggestionId = req.params._id
//     const suggestion = await Suggestion.findById(suggestionId)
//     //const updateDestination = req.body
//     if(!suggestion) {
//       return res.send({message: "suggestion doesn't exist."})
//     }
    
//     await Suggestion.findByIdAndDelete(suggestionId)

//   res.sendStatus(204)
//     })





// app.put('/suggestions/:_id', async function(req,res){

//   console.log('RUNNING CODE FROM CONTROLLER')
//   const suggestionId = req.params._id
//   const suggestion = await Suggestion.findById(suggestionId)
//   //const updateDestination = req.body
//   if(!suggestion) {
//     return res.send({message: "suggestion doesn't exist."})
//   }
//   await Suggestion.findByIdAndUpdate(suggestionId)
// res.sendStatus(204)
// })






// router.route('/transport/:id').put(async function (req, res) {
//     if(!req.session.user){
//       return res.status(402).send({message: "you must be logged in to update a mode of transport"})
//      }
//         const modeOfTransportId = req.params.id
  
//         const transport = await ModeOfTransport.findById(modeOfTransportId).populate('user')
  
//         if (!transport.user._id.equals(req.session.user._id)) {
//           return res.status(402).send({ message: "this is not your destination to update!"})
//         }
//         const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, {new:true})
      
//         res.redirect('/transport')
//         })







// app.put('/modesOfTransport/:id', async function(req, res) {
//   const modeOfTransportId = req.params.id;

//   // Check if the provided ID is a valid ObjectId
//   if (!mongoose.Types.ObjectId.isValid(modeOfTransportId)) {
//     return res.status(400).send({ error: 'Invalid ObjectId' });
//   }

//   try {
//     const updateModesOfTransport = await ModeOfTransport.findByIdAndUpdate(modeOfTransportId, req.body, { new: true });

//     if (!updateModesOfTransport) {
//       return res.status(404).send({ error: 'Mode of transport not found' });
//     }

//     res.send(updateModesOfTransport);
//   } catch (error) {
//     res.status(500).send({ error: 'Something went wrong' });
//   }
// });






















//     app.put('/suggestions/:id', function (req,res) {
//         const suggestionId = Number (req.params.id)
//         const updatedSuggestion = req.body
// //get the suggestion index to replace
// //over write that object in the array
// //send it back to the user
// const suggestionIndex = suggestions.findIndex((currentSuggestion) => {
// return currentSuggestion.id === suggestionId

// })
// console.log(`suggestion index is ${suggestionIndex}`)
// if (suggestionIndex !== -1) {
// suggestions[suggestionIndex] = updatedSuggestion
// console.log(suggestions)
// res.send(suggestions)
// } else {
//     // If suggestion is not found, send an error response
//     res.status(404).send({ error: "Suggestion not found" });
// }
//     })








// app.delete('/suggestions/:id', function (req,res){

//     const suggestionId = Number(req.params.id)
//     const suggestionIndex = suggestions.findIndex((suggestion) => {
//         return suggestion.id === suggestionId
//     })
//     suggestions.splice(suggestionIndex,1)
//     res.send(suggestions)
// })




app.listen(3000, () => {
    console.log('Server is running on port 3000!')
  })


  const url = 'mongodb://127.0.0.1:27017/'
  const dbname = 'suggestions-db'
  mongoose.connect(`${url}${dbname}`)