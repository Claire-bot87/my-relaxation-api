//we use a router to refactor our routes
import express from 'express'
import Suggestion from '../models/suggestion.js'
const router = express.Router()

// router.route('/suggestions').post( async function (req,res){
// const newSuggestion = await Suggestion.create(req.body)

// res.status(201).send(newSuggestion)


// })

// router.route('/suggestions').post( async function (req,res){
//     console.log('RUNNING CODE IN CONTROLLER')
// const newSuggestion = req.body
// suggestions.push(newSuggestion)
// res.send(suggestions)
//   })

//** PRE EJS CODE: */
  router.route('/suggestion').post(async function(req, res) {
    console.log("RUNNING CODE FROM CONTROLLER")
  // Get the new destination from the body of request
  const newSuggestion = await Suggestion.create(req.body)
  // Send back our destination with appropriate status code.
  res.status(201).send(newSuggestion)
})

router.route('/suggestions').get(async function(req, res){
  console.log("RUNNING CODE FROM CONTROLLER")
  const suggestions = await Suggestion.find()
  res.status(201).send(suggestions)
})


// router.route('/suggestion/:_id').get(async function(req,res){
//   console.log('RUNNING CODE FROM CONTROLLER')
//     const suggestion = await Suggestion.findById(req.params._id)
//     res.status(201).send(suggestion)
// })

router.route('/suggestions/:_id').delete(async function(req,res){
  console.log('RUNNING CODE FROM CONTROLLER')
  const suggestionId = req.params._id
  const suggestion = await Suggestion.findById(suggestionId)
  //const updateDestination = req.body
  if(!suggestion) {
    return res.send({message: "suggestion doesn't exist."})
  }
  await Suggestion.findByIdAndDelete(suggestionId)
res.sendStatus(204)
})


router.route('/suggestionS/:_id').put(async function (req, res) {
  // if(!req.session.user){
  //   return res.status(402).send({message: "you must be logged in to update a mode of transport"})
  //  }
  console.log("RUNNING CODE FROM CONTROLLER FOR PUT😄")
      const suggestionId = req.params._id

      const suggestion = await Suggestion.findById(suggestionId)

      // if (!transport.user._id.equals(req.session.user._id)) {
      //   return res.status(402).send({ message: "this is not your destination to update!"})
      // }
      const updateSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, req.body, {new:true})
    
      res.redirect('/suggestions')
      })



      //** POST EJS CODE: */



      router.route('/suggestion/:_id').get(async function(req,res){
        // console.log('RUNNING CODE FROM CONTROLLER')
         const suggestions = await Suggestion.find()
        //   res.status(201).send(suggestion)
   
        console.log('RUNNING NEW EJS CODE')
          res.render('index.ejs',{
            suggestions:suggestions
            
          })
      })


      router.route('/suggestion/:category').get(async function(req,res){
        // console.log('RUNNING CODE FROM CONTROLLER')
         const suggestions = await Suggestion.find()
         const allSuggestionsWithCategory = await Suggestion.find().populate('category')
        //   res.status(201).send(suggestion)
   
        console.log('RUNNING NEW EJS CODE CATEGORIES')
          res.render('index.ejs',
            {suggestions:suggestions},
            {allSuggestionsWithCategory:allSuggestionsWithCategory})
          })
    

export default router
