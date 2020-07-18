const fs = require('fs')
const data = require("../../data.json")
const { put } = require('./recipes')

module.exports = {
    index(req, res) {
        return res.render('admin/chefs/index', { chefs: data.chefs })
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

        let { name, image } = req.body
        const id = Number(data.chefs.length + 1)

        data.chefs.push({
            id,
            name,
            image,
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

    edit(req, res) {
        const { id } = req.params

        const foundChef = data.chefs.find(function(chef) {
            return chef.id == id
        })

        if (!foundChef) return res.send('Chef não encontrado!')

        const chef = {
            ...foundChef,
        }

        return res.render('admin/chefs/edit', { chef })
    },

    put(req, res) {
        const { id } = req.body
        let index

        const foundChef = data.chefs.find(function(chef, foundIndex){
            if(chef.id == id) {
                index = foundIndex
                return true
            }
        })

        if(!foundChef) return res.send("Chef não encontrado")

        const chef = {
            ...foundChef,
            ...req.body,
            id: Number(id)
        }

        data.chefs[index] = chef

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file error') 
            return res.redirect(`/admin/chefs/${id}`)
        })
    },

    delete(req, res) {
        const { id } = req.body

        const filteredChefs = data.chefs.filter(function(chef){
            return chef.id != id
        })

        data.chefs = filteredChefs

        fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send('Write file error') 
            
            return res.redirect('/admin/chefs')
        })
    }

}
