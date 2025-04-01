# General Assembly Project 2

### Table of Contents
* [Description](#description)
    - [Deployment Link](#deployment-link)
    - [Code Installation](#code-installation)
    - [Timeframe and Working Team](#timeframe-and-working-team)
    - [Technologies Used](#technologies-used)
    - [Brief](#brief)
* [Planning](#planning)
    - [Styling](#styling)
    - [Finding a dataset](#finding-a-dataset)
* [Build Process](#build-process)
    - [Seeding the database](#seeding-the-database)
    - [Handling the data](#handling-the-data)
    - [Setting up the frontend](#setting-up-the-frontend)
    - [The browse page](#the-browse-page)
    - [Styling](#styling)
    - [Stretch Goals](#stretch-goals)
* [Challenges](#challenges)
* [Wins](#wins)
* [Key Learnings](#key-learnings)
* [Bugs](#bugs)
* [Future Improvements](#future-improvements)

# Description
This is my second project in the course. I completed it in week 6. It is an api. I chose to build an api which gives suggestions for ways to relax. 

### Deployment Link 
https://relax-now.netlify.app/

### Code Installation
https://github.com/Claire-bot87/my-relaxation-api)


### Timeframe and Working Team

I worked independently for this project. We had 1 week to complete it.

### Technologies Used
Node
Express
EJS
Mongoose
MongoDB Compass
Netlify


### Brief
\aplication with full crud


The app utilises EJS templates for rendering views to users
The ap uses session-based authentication
The app’s files are organisex folowign conventions taugh tin lectures

The app has at leats one data entitiy in addition to the User model
At least one erntity must jave a relationshuip with the user model
It must have full CRUD finctionality
Authorisation os implemented (only loggedin users can create updat or deletedata)
The app must be deployed online


## Planning
![Wireframe 1](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743006129/Screenshot_2025-03-26_at_16.19.22_vqwjbb.png)

![Wireframe 2](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743006129/Screenshot_2025-03-26_at_16.17.58_bxj1dm.png)

![Wireframe 3](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743006129/Screenshot_2025-03-26_at_16.18.26_xjbuu9.png)

![Wireframe 4](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743006129/Screenshot_2025-03-26_at_16.19.02_lol5zu.png)

## Build Process



File structure
First I built out the models:
- User Model
- Suggestion model

In my suggestion model i had a category key, because I wanted to group the suggestions by category.
Then I built my controllers and my views.

A detailed look at adding a new suggestion. 

First I rendered the new suggestion page:
Controller
```.js
router.route('/suggestion/new').get(async function (req, res, next) {
  try {
    res.render('suggestion/new.ejs')
  } catch (e) {
    next(e)
  }
})
```
view:
```.js
<%- include('../partials/html-head') %>
<%- include('../partials/nav') %>

<h1>add a new suggestion</h1>

<form action= "/suggestion/new" method="POST">
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">  
    <label for="description">Description:</label>
    <input type="text" name="description" id="description"> 
    <label for="category">Category:</label>
    <input type="text" name="category" id="category"> 
    <button type="submit">Add suggestion</button>
      </form>
</body>
</html>

```



Then I enabled a POST request to post a new suggestion, adding it to the database.
```.js
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
```




## Challenges


## Wins


## Key Learnings


## Bugs


## Future Improvements

