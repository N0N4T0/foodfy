const Recipes = require("../../models/admin/Recipes")
const File = require("../../models/admin/File")

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
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create(file))//array de promises não executadas
        const filesResults = await Promise.all(filesPromise)// retornará um array com ids do File.create()

        //mapeará cada file, onde fileId receberá o id do arquivo
        const recipeFilesPromises = filesResults.map(file => {
            const fileId = file.rows[0].id
        
            //id do arquivo com id da receita
            File.createRecipeFiles(fileId, recipeId)
        })

        await Promise.all(recipeFilesPromises)


        return res.redirect(`/admin/recipes/${recipeId}`)
    },
    
    async show(req, res) {  
        const results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Receita not found!')

        return res.render('admin/recipes/show', { recipe })
    },
    
    async edit(req, res) {
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send('Receita not found!')

        results = await Recipes.chefsSelectOptions()
        const options = results.rows

        return res.render('admin/recipes/edit', { recipe, chefOptions: options })
    },
    
    async put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }
    
        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },
    
    async delete(req, res) {
        await Recipes.delete(req.body.id)

        return res.redirect('/admin/recipes')


        // Recipes.delete(req.body.id, function(){
        //     return res.redirect('/admin/recipes')

        // })
        
    }
}
