const express = require('express')
const routes = express.Router()
const multer = require("../app/middlewares/multer")

const recipes = require("../app/controllers/recipes")
const chefsAdmn = require("../app/controllers/chefsAdm")


//rotas
routes.get("/recipes", recipes.index) // Mostrar a lista de receitas
routes.get("/recipes/create", recipes.create) // Mostrar formulário de nova receita
routes.get("/recipes/:id", recipes.show) // Exibir detalhes de uma receita
routes.get("/recipes/:id/edit", recipes.edit) // Mostrar formulário de edição de receita
routes.post("/recipes", multer.array("photos", 5), recipes.post) // Cadastrar nova receita
routes.put("/recipes", multer.array("photos", 5), recipes.put) // Editar uma receita
routes.delete("/recipes", recipes.delete) // Deletar uma receita

routes.get("/chefs", chefsAdmn.index)
routes.get("/chefs/create", chefsAdmn.create)
routes.get("/chefs/:id", chefsAdmn.show)
routes.get("/chefs/:id/edit", chefsAdmn.edit)
routes.post("/chefs", multer.array("photo", 1), chefsAdmn.post)
routes.put("/chefs", multer.array("photo", 1), chefsAdmn.put)
routes.delete("/chefs", chefsAdmn.delete)


module.exports = routes