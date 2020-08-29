const db = require("../../../config/db")
const { date } = require("../../../lib/utils")


module.exports = {
    all(){
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.title ASC
        `)
    },

    find(id){
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
    },

    chefsSelectOptions(){
        return db.query(`
        SELECT name, id FROM chefs
        ORDER BY chefs.name
        `)
    },

    findByRecipes(filter) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            `)
    },


}