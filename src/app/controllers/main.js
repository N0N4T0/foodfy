const Main = require("../models/Main")

module.exports = {
    async index(req, res) {
        let results = await Main.all()
        const recipes = results.rows

        if(!recipes) return res.send('Recipe Not Found!')

        async function getImage(recipeId){
            let results = await Main.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })

        await Promise.all(imagesPromise)

        return res.render('main/index', { recipes })
    },
    
    about(req, res) {
        return res.render('main/about')
    },
    
    async recipes(req, res) {
        let results = await Main.all()
        const recipes = results.rows

        if(!recipes) return res.send('Recipe Not Found!')

        async function getImage(recipeId){
            let results = await Main.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })

        await Promise.all(imagesPromise)
        return res.render('main/recipes', { recipes })
    },
    
    async recipe(req, res) {
        const {id} = req.params  
        let results = await Main.find(id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Recipe not found!')

        results = await Main.files(recipe.id)
        let files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('main/recipe', { recipe, files })
    },

    async searchRecipe(req, res) {
        const { filter } = req.query

        let results = await Main.findByRecipes(filter)
        const recipes = results.rows

        if(!filter) return res.send('Por favor, digite algo para pesquisar!')
        if(!recipes) return res.send('Recipe Not Found!')

        async function getImage(recipeId){
            let results = await Main.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })
        
        await Promise.all(imagesPromise)

        return res.render("main/search", { recipes, filter })          
    }
}