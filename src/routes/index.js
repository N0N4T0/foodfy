const express = require('express')
const routes = express.Router()

const admin = require("./admin")
const users = require("./users")

const main = require("../app/controllers/main")
const chefs = require("../app/controllers/chefs")

//rotas

//site
//main = recipes sem ser na pagina administrativa
routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipe/:id', main.recipe)
routes.get('/search', main.searchRecipe)

routes.get('/chefs', chefs.index)


routes.use('/admin', admin)
routes.use('/users', users)



module.exports = routes