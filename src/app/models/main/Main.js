const db = require("../../../config/db")
const { date } = require("../../../lib/utils")


module.exports = {
    all(callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.title ASC
        `, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })
    },

    find(id, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function(err, results){
                if(err) throw `Database Error ${err}`
            
                callback(results.rows[0])
            })
    },

    chefsSelectOptions(callback){
        db.query(`
        SELECT name, id FROM chefs
        ORDER BY chefs.name`, function(err, results){
            if(err) throw `Database Error ${err}`

            return callback(results.rows) 
        })
    }


}