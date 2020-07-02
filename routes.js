const express = require('express')
const routes = express.Router()

const main = require("./controller/main")


//rotas
routes.get("/", main.index)

routes.get("/about", main.about)

routes.get("/recipes", main.recipes)

routes.get("/recipes/:index", main.recipe)


module.exports = routes