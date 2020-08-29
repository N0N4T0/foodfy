const Chefs = require("../../models/main/Chefs")

module.exports = {
    async index(req, res) {
        const results = await Chefs.all()

        const chefs = results.rows

        return res.render('main/chefs', { chefs })
    }

}