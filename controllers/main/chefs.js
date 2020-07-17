const fs = require('fs')

module.exports = {
    index(req, res) {
        return res.render('main/chefs')
    }

}