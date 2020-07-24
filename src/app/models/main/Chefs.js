const db = require("../../../config/db")

module.exports = {
    all(callback){
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id
        ORDER BY chefs.name ASC
        `, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })
    },    

}