import express from 'express'
import User from '../models/user.js'

const router = express.Router()


//i need two GETs and two POSTs

// ** GETs :

router.route('/user/new').get(async function (req, res, next) {
    try {
      
      res.render('user/newuser.ejs')
    } catch (e) {
      next(e)
    }
  })


  router.route('/user/login').get(async function (req, res, next) {
    try {
      res.render('user/login.ejs')
    } catch (e) {
      next(e)
    }
  })



  router.route('/user/new').post(async function (req, res) {
   
    // Get the new destination from the body of request
    const newUser = await User.create(req.body)
    // Send back our destination with appropriate status code.
    res.redirect('/user/login')
  })

  router.route('/user/login').post(async function (req, res) {
   
  

        const user = await User.findOne({email: req.body.email})
      
        if(!user.isPasswordValid(req.body.password)){
          return res.status(401).send({message:"Unauthorised"})
        }
        
        req.session.user = user // adds the user to the current session
        res.redirect('/')
        //res.send({message: "Login succesful"})
      
        }
        )


        router.route('/user/signout').get(async function (req, res) {
          req.session.destroy()
          res.redirect('/')
        })

  export default router