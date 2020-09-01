const db = require("../../config/db")

module.exports = {
    all(){
        return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        ORDER BY chefs.name ASC
        `)
    },    

}