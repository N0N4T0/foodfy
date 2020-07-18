const express = require('express')
const routes = express.Router()

const main = require("./controllers/main/main")
const chefs = require("./controllers/main/chefs")

const recipes = require("./controllers/admin/recipes")
const chefsAdmn = require("./controllers/admin/chefsAdm")


//rotas
routes.get('/', main.index)
routes.get('/about', main.about)
routes.get('/recipes', main.recipes)
routes.get('/recipes/:index', main.recipe)

routes.get('/chefs', chefs.index)

routes.get("/admin/recipes", recipes.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create) // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show) // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit) // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post) // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put) // Editar uma receita
routes.delete("/admin/recipes", recipes.delete) // Deletar uma receita

routes.get("/admin/chefs", chefsAdmn.index)
routes.get("/admin/chefs/create", chefsAdmn.create)
routes.get("/admin/chefs/:id", chefsAdmn.show)
routes.get("/admin/chefs/:id/edit", chefsAdmn.edit)
routes.post("/admin/chefs", chefsAdmn.post)
routes.put("/admin/chefs", chefsAdmn.put)
routes.delete("/admin/chefs", chefsAdmn.delete)


module.exports = routes