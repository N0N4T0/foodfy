const Main = require("../../models/main/Main")

module.exports = {
    index(req, res) {
        Main.all(function(recipes){
            return res.render('main/index', { recipes })
        })
    },
    
    about(req, res) {
        return res.render('main/about')
    },
    
    recipes(req, res) {
        Main.all(function(recipes){
            return res.render('main/recipes', { recipes })
        })
    },
    
    recipe(req, res) {
        Main.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Receita not found!')

            return res.render('main/recipe', { recipe })
        })
    }
}