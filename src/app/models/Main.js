const db = require("../../config/db")
const { date } = require("../../lib/utils")


module.exports = {
    all(){
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chef_name 
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY recipes.title ASC
            `)

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

    findByRecipes(filter) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.title ILIKE '%${filter}%'
            `)

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