const fs = require('fs')
const data = require("../../data.json")

module.exports = {
    index(req, res) {
        return res.render('admin/chefs/index')
    },

    show(req, res) {
        return res.render('admin/chefs/show', { recipes: data.recipes })
    }

}
