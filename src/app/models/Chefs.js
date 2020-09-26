const db = require("../../config/db")

module.exports = {
    all(params){
        try {
            return db.query(`
                SELECT chefs.*, count(recipes) AS total_recipes
                FROM chefs
                LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
                GROUP BY chefs.id
                LIMIT $1 OFFSET $2
            `, [params.limit, params.offset])

        } catch (err) {
            console.error(err)
        }        
    },    

}