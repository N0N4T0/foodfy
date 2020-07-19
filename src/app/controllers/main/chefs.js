const { chefs } = require('../../../../data.json')

module.exports = {
    index(req, res) {
        return res.render('main/chefs')
    }

}