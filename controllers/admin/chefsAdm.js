const fs = require('fs')
const data = require("../../data.json")

module.exports = {
    index(req, res) {
        return res.render('admin/chefs/index', { chefs: data.chefs })
    },

    create(req, res) {
        return res.render('admin/chefs/create')
    }, 

    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if(req.body[key] == '')
                return res.send('Por favor, preencha todos os campos')
        }

        let { name, image } = req.body
        const id = Number(data.chefs.length + 1)

        data.chefs.push({
            id,
            ...req.body
        })

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
           if (err) return res.send('Write file error') 
           return res.redirect(`/admin/chefs/${id}`)
        })
    },

    show(req, res) {
        const { id } = req.params

        const foundChef = data.chefs.find(function(chef) {
            return chef.id == id
        })

        if (!foundChef) return res.send('Chef não encontrado!')

        const chef = {
            ...foundChef,
        }

        return res.render('admin/chefs/show', { chef })
    },


}
