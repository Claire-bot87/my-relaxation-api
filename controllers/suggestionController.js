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
// router.route('/suggestion/new').post(async function (req, res) {
//   console.log("RUNNING CODE FROM CONTROLLER")
//   // Get the new destination from the body of request
//   const newSuggestion = await Suggestion.create(req.body)
//   // Send back our destination with appropriate status code.
//   res.redirect('/')
// })

// router.route('/suggestions').get(async function (req, res) {
//   console.log("RUNNING CODE FROM CONTROLLER")
//   const suggestions = await Suggestion.find()
//   res.status(201).send(suggestions)
// })


// router.route('/suggestion/:_id').get(async function(req,res){
//   console.log('RUNNING CODE FROM CONTROLLER')
//     const suggestion = await Suggestion.findById(req.params._id)
//     res.status(201).send(suggestion)
// })

// router.route('/suggestions/:_id').delete(async function (req, res) {
//   console.log('RUNNING CODE FROM CONTROLLER')
//   const suggestionId = req.params._id
//   const suggestion = await Suggestion.findById(suggestionId)
//   //const updateDestination = req.body
//   if (!suggestion) {
//     return res.send({ message: "suggestion doesn't exist." })
//   }
//   await Suggestion.findByIdAndDelete(suggestionId)
//   res.sendStatus(204)
// })


// router.route('/suggestions/:_id').put(async function (req, res) {
//   // if(!req.session.user){
//   //   return res.status(402).send({message: "you must be logged in to update a mode of transport"})
//   //  }
//   console.log("RUNNING CODE FROM CONTROLLER FOR PUT😄")
//   const suggestionId = req.params._id

//   const suggestion = await Suggestion.findById(suggestionId)

//   // if (!transport.user._id.equals(req.session.user._id)) {
//   //   return res.status(402).send({ message: "this is not your destination to update!"})
//   // }
//   const updateSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, req.body, { new: true })

//   res.redirect('/suggestions')
// })



//** POST EJS CODE: */


router.route('/').get(async function(req, res, next){
  try{
      res.render('home.ejs')
  }catch(e) {
      next(e)
  }
})


router.route('/suggestion/new').get(async function(req, res, next){
  try{
      res.render('suggestion/new.ejs')
  }catch(e) {
      next(e)
  }
})

router.route('/suggestion/update/:id').get(async function(req, res, next){
  try{
   
  const suggestion = await Suggestion.findById(req.params.id)
      res.render('suggestion/update.ejs', { suggestion: suggestion})
   
  }catch(e) {
      next(e)
  }
})

router.route('/suggestion/:category').get(async function (req, res) {
  const suggestions = await Suggestion.find()
  const chosenCategory = req.params.category
  res.render('index.ejs',
    {
      suggestions: suggestions,
      chosenCategory: chosenCategory
    }
  )
})

//**i don't think i need this next route: */

// router.route('/suggestion/:_id').get(async function (req, res) {
//   // console.log('RUNNING CODE FROM CONTROLLER')
//   const suggestionId = req.params.id
//   const suggestion = await Suggestion.findById()
//   //   res.status(201).send(suggestion)

//   console.log('RUNNING NEW EJS CODE')
//   res.render('index.ejs', {
//     suggestion: suggestion

//   })
// })

router.route('/suggestion/:id').delete(async function (req, res) {
 console.log('RUNNING THE POST EJS CODE')
    const suggestionId = req.params.id
   
    await Suggestion.findByIdAndDelete(suggestionId)
    res.redirect('/')
  })


  router.route('/suggestion/update/:id').put(async function (req, res) {
    // if(!req.session.user){
    //   return res.status(402).send({message: "you must be logged in to update a mode of transport"})
    //  }
    console.log("RUNNING CODE FROM CONTROLLER FOR PUT😄")
    const suggestionId = req.params.id
  
    const suggestion = await Suggestion.findById(suggestionId)
  
    // if (!transport.user._id.equals(req.session.user._id)) {
    //   return res.status(402).send({ message: "this is not your destination to update!"})
    // }
    const updateSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, req.body, { new: true })
    if (!updateSuggestion) {
      return res.status(404).send({ message: "Suggestion not found" });
    }
    res.redirect('/')
    
  })

  router.route('/suggestion/new').post(async function (req, res) {
    console.log("RUNNING CODE FROM CONTROLLER")
    // Get the new destination from the body of request
    const newSuggestion = await Suggestion.create(req.body)
    // Send back our destination with appropriate status code.
    res.redirect('/')
  })



export default router
