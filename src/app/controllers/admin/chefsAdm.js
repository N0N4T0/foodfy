const ChefsAdm = require("../../models/admin/ChefsAdm")

module.exports = {
    async index(req, res) {
        const results = await ChefsAdm.all()
        const chefs = results.rows
        
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
           
        const results = await ChefsAdm.create(req.body)
        const chef = results.rows[0]

        return res.redirect(`/admin/chefs/${chef.id}`)           
    },

    async show(req, res) {
        let results = await ChefsAdm.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef não encontrado!")

        results = await ChefsAdm.chefRecipes(req.params.id)
        const recipes = results.rows

        return res.render('admin/chefs/show', { chef, recipes })
    },

    async edit(req, res) {
        const results = await ChefsAdm.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef não encontrado!")

        return res.render('admin/chefs/edit', { chef })
    },

    async put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }

        await ChefsAdm.update(req.body)

        return res.redirect(`/admin/chefs/${req.body.id}`)    
    },

    async delete(req, res) {
        await ChefsAdm.delete(req.body.id)

        return res.redirect('/admin/chefs')
    },

}
