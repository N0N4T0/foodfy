const db = require("../../config/db")
const { date } = require("../../lib/utils")

const File = require("../models/File")


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

    create(data) {
        try {
            const query = `
            INSERT INTO recipes(
               title,
               ingredients,
               preparation,
               information,
               created_at,
               chef_id 
            ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `
    
            const values = [
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso,
                data.chef
            ]
    
            return db.query(query, values)

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

    update(data){
        try {
            const query = `
            UPDATE recipes SET
                title = ($1),
                ingredients = ($2),
                preparation = ($3),
                information = ($4),
                chef_id = ($5)
            WHERE id = $6
            `

            const values = [
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                data.chef,
                data.id
            ]

            return db.query(query, values)

        } catch (err) {
            console.error(err)
        }          
    },

    async delete(id){
        try {           
            //quantos arquivos de receita tem
            let results = await db.query(`
            SELECT files.* FROM files 
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id) 
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id)
            WHERE recipes.id = $1
            `, [id])

            const recipes_files = results.rows

            //dos recipe_files pegar todas as imagens
            const allFilesPromise = recipes_files.map(recipe_file =>
                File.delete(recipe_file.id))

            await Promise.all(allFilesPromise)
            
            return db.query(`DELETE FROM recipes WHERE id = $1`, [id])

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