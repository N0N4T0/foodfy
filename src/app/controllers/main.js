const Main = require("../models/Main")

module.exports = {
    async index(req, res) {
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page -1)
        const params = {limit, page, offset}

        let results = await Main.all(params)
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

        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(recipes[0].total / limit), page} 

        return res.render('main/index', { recipes:lastAdded, pagination })
    },
    
    about(req, res) {
        return res.render('main/about')
    },
    
    async recipes(req, res) {
        let {limit, page} = req.query, offset
        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}

        let results = await Main.all(params)
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

        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(recipes[0].total / limit), page} 

        return res.render('main/recipes', { recipes: lastAdded, pagination })
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
        let {filter, limit, page} = req.query, offset

        limit = limit || 6
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset, filter}

        let results = await Main.findByRecipes(params)
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
        
        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(recipes[0].total / limit), page}

        return res.render("main/search", { recipes: lastAdded, filter, pagination })          
    }
}