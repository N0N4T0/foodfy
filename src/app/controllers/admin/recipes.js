const Recipes = require("../../models/admin/Recipes")

module.exports = {
    index(req, res) {
        Recipes.all(function(recipes){
            return res.render('admin/recipes/index', { recipes })

        })
    },
    
    create(req, res){
        return res.render('admin/recipes/create')
    },
    
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }
    
        Recipes.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
        
    },
    
    show(req, res) {   
        Recipes.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Receita not found!')

            return res.render('admin/recipes/show', { recipe })
        })
    },
    
    edit(req, res) {
        Recipes.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Receita not found!')

            return res.render('admin/recipes/edit', { recipe })
        })
    },
    
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }
    
        Recipes.update(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)

        })

        
    },
    
    delete(req, res) {
        Recipes.delete(req.body.id, function(){
            return res.redirect('/admin/recipes')

        })
        
    }
}
