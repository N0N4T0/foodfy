const Recipes = require("../models/Recipes")
const File = require("../models/File")

module.exports = {
    async index(req, res) {
        const results = await Recipes.all()
        const recipes = results.rows

        return res.render('admin/recipes/index', { recipes })
    },
    
    async create(req, res){
        const results = await Recipes.chefsSelectOptions()

        const options = results.rows

        return res.render('admin/recipes/create', { chefOptions: options })
    },
    
    async post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }

        if(req.files.length == 0) {
            return res.send('Envie ao menos uma imagem')
        }
  
        let results = await Recipes.create(req.body)
        const recipe = results.rows[0].id

        const imagesPromise = req.files.map(file => File.createRecipeFiles({
            ...file,
            path: file.path.replace(/\\/g, "/" ),
            recipe_id: recipe
        }))
        
        await Promise.all(imagesPromise)

        return res.redirect(`/admin/recipes/${recipe}`)
    },
    
    async show(req, res) { //ok
        try {
            const {id} = req.params  
            let results = await Recipes.find(id)
            const recipe = results.rows[0]

            results = await Recipes.files(recipe.id)
            let files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            // http             ://     localhost:3000/         /images/1598981549938-chef.png
            // ${req.protocol}  ://     ${req.headers.host}     ${file.path.replace("public", "")

            return res.render('admin/recipes/show', { recipe, files })  
        } catch (err) {
            console.error(err)
        }     
    },
    
    async edit(req, res) { //ok
        const { id } = req.params

        let results = await Recipes.find(id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Receita not found!')

        results = await Recipes.chefsSelectOptions()
        const options = results.rows

        results = await Recipes.files(recipe.id)
        let files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/recipes/edit', { recipe, chefOptions: options, files })
    },
    
    async put(req, res) { //ok
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            //removed_files = campo escondido no fields, só assume valor se tiver foto
            if (req.body[key] == '' && key != "removed_files")
                return res.send('Por favor, preencha todos os campos.')
        }
    
        if(req.files.length != 0){
            const newFilesPromise =req.files.map(file =>
                File.createRecipeFiles({ ...file, recipe_id: req.body.id }))

            await Promise.all(newFilesPromise)    
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },
    
    async delete(req, res) {
        await Recipes.delete(req.body.id)

        return res.redirect('/admin/recipes')        
    }
}