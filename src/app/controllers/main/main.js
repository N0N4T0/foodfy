const Main = require("../../models/main/Main")

module.exports = {
    async index(req, res) {
        const results = await Main.all()
        
        const recipes = results.rows

        return res.render('main/index', { recipes })
    },
    
    about(req, res) {
        return res.render('main/about')
    },
    
    async recipes(req, res) {
        const results = await Main.all()
        
        const recipes = results.rows

        return res.render('main/recipes', { recipes })
    },
    
    async recipe(req, res) {
        const results = await Main.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Recipe not found!')

        return res.render('main/recipe', { recipe })
    },

    async searchRecipe(req, res) {
        const { filter } = req.query

        const results = await Main.findByRecipes(filter)
        const recipes = results.rows

        if(!filter) return res.send('Por favor, digite algo para pesquisar!')
        
        return res.render("main/search", { recipes, filter })          
    }
}