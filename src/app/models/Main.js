const db = require("../../config/db")


module.exports = {
    all(params){
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY updated_at DESC
                LIMIT $1 OFFSET $2
            `,  [params.limit, params.offset])

        } catch (err) {
            console.error(err)
        }        
    },

    find(id){
        try {
            return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])

        } catch (err) {
            console.error(err)
        }        
    },

    chefsSelectOptions(){
        try {
            return db.query(`
                SELECT name, id FROM chefs
                ORDER BY chefs.name
            `)

        } catch (err) {
            console.error(err)
        }        
    },

    findByRecipes(params) {
        try {
            let filterQuery = ``,
                totalQuery = `(SELECT count(*) FROM recipes) AS total`

            if(params.filter){
                filterQuery = `WHERE recipes.title ILIKE '%${params.filter}%'`
                totalQuery = `(SELECT count(*) FROM recipes ${filterQuery}) AS total`
            }

            let query = `
                SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${filterQuery}
                ORDER BY updated_at DESC
                LIMIT $1 OFFSET $2
            `

            return db.query(query, [params.limit, params.offset])

        } catch (err) {
            console.error(err)
        }        
    },

    files(id){
        try {
            return db.query(`SELECT files.* FROM files LEFT JOIN recipe_files ON (files.id = recipe_files.file_id) 
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id)
            WHERE recipes.id = $1`, [id])

        } catch (err) {
            console.error(err)
        }       
    }

}