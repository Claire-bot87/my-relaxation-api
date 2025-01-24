//we use a router to refactor our routes
import express from 'express'
import Suggestion from '../models/suggestion.js'

const router = express.Router()


router.route('/').get(async function (req, res, next) {
  try {
    res.render('home.ejs')
  } catch (e) {
    next(e)
  }
})


router.route('/suggestion/new').get(async function (req, res, next) {
  try {
    res.render('suggestion/new.ejs')
  } catch (e) {
    next(e)
  }
})

router.route('/suggestion/update/:id').get(async function (req, res, next) {
  try {

    const suggestion = await Suggestion.findById(req.params.id)
    res.render('suggestion/update.ejs', { suggestion: suggestion })

  } catch (e) {
    next(e)
  }
})

router.route('/suggestion/:category').get(async function (req, res) {
  const user = req.session.user
  console.log('USER')
  console.log(user)
  const suggestions = await Suggestion.find()
  const chosenCategory = req.params.category
  res.render('index.ejs',
    {
      suggestions: suggestions,
      chosenCategory: chosenCategory,
      user: user,
    }
  )
})


router.route('/suggestion/:id').delete(async function (req, res) {


  if (!req.session.user) {
    return res.status(402).send({ message: "you must be logged in to delete a suggestion" })
  }
  const suggestionId = req.params.id
  const suggestion = await Suggestion.findById(suggestionId).populate('user')

  if (!suggestion.user) {
    return res.status(404).send({ message: "Associated user not found for this suggestion." });
  }
 
  if (!suggestion.user._id.equals(req.session.user._id)) {
    return res.status(402).send({ message: "this is not your suggestion to delete!" })
  }
  if (!suggestion) {
    return res.send({ message: "Suggestion doesn't exist." })
  }

  await Suggestion.findByIdAndDelete(suggestionId)
  res.redirect('/')
})


router.route('/suggestion/update/:id').put(async function (req, res) {
  if (!req.session.user) {
    return res.status(402).send({ message: "you must be logged in to update a suggestion" })
  }

  const suggestionId = req.params.id

  const suggestion = await Suggestion.findById(suggestionId)


  const updateSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, req.body, { new: true })
  if (!updateSuggestion) {
    return res.status(404).send({ message: "Suggestion not found" });
  }
  res.redirect('/')

})

router.route('/suggestion/new').post(async function (req, res) {
 
  try {

    if (!req.session.user) {
      return res.status(402).send({ message: "you must be logged in to save a suggestion" })
    }

    req.body.user = req.session.user
  
    // Get the new destination from the body of request
    const newSuggestion = await Suggestion.create(req.body)
    // Send back our destination with appropriate status code.
    res.redirect('/')
  } catch (e) {
    next(e)
  }
})






export default router
