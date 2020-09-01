const db = require("../../config/db")

module.exports = {
    create(data){
        const query = `
        INSERT INTO files (
            name, 
            path
        ) VALUES ($1, $2) 
            RETURNING id
        `
        
        const values = [
            data.filename,
            data.path
        ]

        return db.query(query, values)
    },

    async createRecipeFiles(data){
        const query = `
        INSERT INTO files (
            name, 
            path
        ) VALUES ($1, $2)
            RETURNING id`
        
        const values = [
            data.filename,
            data.path
        ]
        
        const results = await db.query(query, values)

        const recipeFilesQuery = `
        INSERT INTO recipe_files (
            recipe_id,
            file_id
        ) VALUES ($1, $2) 
            RETURNING id
        `
        
        const recipeFilesValues = [
            data.recipe_id,
            results.rows[0].id
        ]

        return db.query(recipeFilesQuery, recipeFilesValues)
    },

    find(id) {
        return db.query(`SELECT * FROM files WHERE id = $1`, [id])
    }
}