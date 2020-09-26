const db = require("../../config/db")
const { date } = require("../../lib/utils")


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
            console.log(err)
        }        
    },

    create(data, fileId){
        try {
            const query = `
                INSERT INTO chefs(
                    name,
                    created_at,
                    updated_at,
                    file_id
                ) VALUES ($1, $2, $3, $4)
                    RETURNING id
            `

            const values = [
                data.name,
                date(Date.now()).iso,
                date(Date.now()).iso,
                fileId
            ]

            return db.query(query, values)

        } catch (err) {
            console.log(err)
        }        
    },

    find(id){
        try {
            return db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
            `, [id])

        } catch (err) {
            console.log(err)
        }        
    },

    update(data, fileId){
        try {
            const query =`
            UPDATE chefs SET
                name = ($1),
                file_id=($2)
            WHERE id = $3
            `
            const values = [
                data.name,
                fileId,
                data.id,
            ]

            return db.query(query, values)  

        } catch (err) {
            console.error(err)
        }       
    },

    async delete(id){
        try {            
            return db.query(`DELETE FROM chefs WHERE id = $1`, [id])

        } catch (err) {
            console.error(err)
        }        
    },

    chefRecipes(id){
        try {
            return db.query(`
            SELECT * FROM recipes
            WHERE chef_id = $1
            `, [id])

        } catch (err) {
            console.error(err)
        }        
    }


}