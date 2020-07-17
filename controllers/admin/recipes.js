const fs = require('fs')
const data = require("../../data.json")

//ADMIN

module.exports = {
    index(req, res) {
        return res.render('admin/recipes/index', { recipes: data.recipes })
    },
    
    create(req, res){
        return res.render('admin/recipes/create')
    },
    
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (let key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }
    
        let { title, author, image, ingredients, preparation, information } = req.body
        const id = Number(data.recipes.length + 1)

        data.recipes.push({
            id,
            ...req.body
        })
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send('Write file error!')
            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    
    show(req, res) {   
        const { id } = req.params

        const foundRecipe = data.recipes.find(function(recipe) {
            return recipe.id == id
        })
    
        if(!foundRecipe) return res.send('Receita not found!');
    

        const recipe = {
            ...foundRecipe,
        }
        return res.render('admin/recipes/show', { recipe })
    },
    
    edit(req, res) {
        const { id } = req.params

        const foundRecipe = data.recipes.find(function(recipe) {
            return recipe.id == id
        })
    
        if(!foundRecipe) return res.send('Receita not found!');

        const recipe = {
            ...foundRecipe,
        }

        return res.render('admin/recipes/edit', { recipe })
    },
    
    put(req, res) {
        const { id } = req.body;
        let index

        const foundRecipe = data.recipes.find(function(recipe, foundIndex){
            if(recipe.id  == id){
                index = foundIndex            
                return true
            }     
        })

        if(!foundRecipe) return res.send("Recipe not found")

        const recipe = {
            ...foundRecipe,
            ...req.body,
            id: Number(id)
        }

        data.recipes[index] = recipe
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
            if (err) return res.send('Write file error!')

            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    
    delete(req, res) {
        const { id } = req.body

        const filteredRecipes = data.recipes.filter(function(recipe){
            return recipe.id != id
        })
    
        data.recipes = filteredRecipes
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
            if (err) return res.send('Write file error!')
            
            return res.redirect('/admin/recipes')
        })
    }
}
