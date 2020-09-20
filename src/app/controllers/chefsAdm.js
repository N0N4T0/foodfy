const ChefsAdm = require("../models/ChefsAdm")
const File = require("../models/File")
const Recipes = require("../models/Recipes")

module.exports = {
    async index(req, res) {
        const results = await ChefsAdm.all()
        const chefs = results.rows
        
        async function getImage(fileId){
            let results = await File.find(fileId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = chefs.map( async chef => {
            chef.avatar = await getImage(chef.file_id)
            return chef
        })

        await Promise.all(imagesPromise)

        return res.render('admin/chefs/index', { chefs })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    }, 

    async post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }

        // if(req.files.length == 0) {
        //     return res.send('Envie ao menos uma imagem')
        // }

        const imagesPromise = req.files.map(file => File.create({
            ...file,
            // path: file.path.replace(/\\/g, "/" )
        }))
        let results = await imagesPromise[0]

        const imageId = results.rows[0].id
        results = await ChefsAdm.create(req.body, imageId)
        const chef = results.rows[0].id

        return res.redirect(`/admin/chefs/${chef}`)           
    },

    async show(req, res) {
        let results = await ChefsAdm.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef não encontrado!")

        results = await ChefsAdm.chefRecipes(req.params.id)
        const recipes = results.rows

        results = await File.find(chef.file_id)
        let avatar = results.rows.map(avatar => ({
            ...avatar,
            src: `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }))

        async function getImage(recipeId){
            let results = await Recipes.files(recipeId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = recipes.map( async recipe => {
            recipe.image = await getImage(recipe.id)
            return recipe
        })

        await Promise.all(imagesPromise)

        return res.render('admin/chefs/show', { chef, recipes, avatar })
    },

    async edit(req, res) {//pagina de editar 
        const {id} = req.params
        let results = await ChefsAdm.find(id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef não encontrado!")

        results = await File.find(chef.file_id)
        let avatars = results.rows.map(avatar => ({
            ...avatar,
            src: `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }))

        return res.render('admin/chefs/edit', { chef, avatars })
    },

    async put(req, res) {//ação da página de editar, a atulização em si
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '' && key != "removed_files")
                return res.send('Por favor, preencha todos os campos.')
        }
                    
        const imagesPromise = req.files.map(file => File.create({...file}))
        let results = await imagesPromise[0]

        const imageId = results.rows[0].id

        await ChefsAdm.update(req.body, imageId)

        //se atualizar a foto, remove a antiga
        if(req.body.removed_files) {
            //6,
            const removedFiles = req.body.removed_files.split(",")//split = separa por vírgulas [6,]
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)//tira uma posição do lastIndex [6]
            
            const removedFilesPromise = removedFiles.map(id => File.delete(id))

            await Promise.all(removedFilesPromise)                      
        }       

        return res.redirect(`/admin/chefs/${req.body.id}`)    
    },

    async delete(req, res) {
        try {
            const { id } = req.body

            await ChefsAdm.delete(id)

            return res.redirect('/admin/chefs')

        } catch (err) {
            console.error(err)
        }
    },

}
