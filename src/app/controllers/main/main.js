const { recipes } = require('../../../../data.json')

module.exports = {
    index(req, res) {
        return res.render('main/index', { recipes })
    },
    
    about(req, res) {
        return res.render('main/about')
    },
    
    recipes(req, res) {
        return res.render('main/recipes', { recipes })
    },
    
    recipe(req, res) {
        const recipesIndex = req.params.index
        return res.render('main/recipe', { recipe: recipes[recipesIndex] })
    }
}