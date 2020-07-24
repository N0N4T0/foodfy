const Chefs = require("../../models/main/Chefs")

module.exports = {
    index(req, res) {
        Chefs.all(function(chefs){
            return res.render('main/chefs', { chefs })

        })
    }

}