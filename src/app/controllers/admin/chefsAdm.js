const ChefsAdm = require("../../models/admin/ChefsAdm")

module.exports = {
    index(req, res) {
        ChefsAdm.all(function(chefs){
            return res.render('admin/chefs/index', { chefs })

        })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    }, 

    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }
                  
        ChefsAdm.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)

        })             
    },

    show(req, res) {
        ChefsAdm.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado!")

            return res.render('admin/chefs/show', { chef })
        })

    },

    edit(req, res) {
        ChefsAdm.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado!")
            
            return res.render('admin/chefs/edit', { chef })
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == '')
                return res.send('Por favor, preencha todos os campos.')
        }

        ChefsAdm.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)

        })        
    },

    delete(req, res) {
        ChefsAdm.delete(req.body.id, function(){
            return res.redirect('/admin/chefs')

        }) 
    },

}
