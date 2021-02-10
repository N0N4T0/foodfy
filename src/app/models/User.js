const crypto = require('crypto')
const fs = require('fs')

const db = require('../../config/db')
const Files = require('../models/File')
const { date } = require('../../lib/utils')
const { hash } = require('bcryptjs')

module.exports = {
    //Retrona os dados de todos os Usuários
    async allUsers(){
        try {
            return db.query(`
                SELECT * FROM users ORDER BY name ASC
            `)
            
        } catch (err) {
            console.error(err)
        }
    },

    //retorna o usuário logado
    async userLogged(id){      
        try {
            return db.query(`SELECT * FROM users WHERE id = $1`, [id])        

        } catch (err) {
            console.error(err)
        }    
    },

    //retorna os dados de um usuário
    async findOne(filters){
        try {
            let query = `SELECT * FROM users`

            Object.keys(filters).map(key => {
                query = `${query}
                ${key}
                `

                Object.keys(filters[key]).map(field => {
                    query = `${query} ${field} = ${filters[key][field]}`
                })
            })

            const results = await db.query(query)

            return results.rows[0]

        } catch (err) {
            console.error(err)
        } 
    },
    
    async post(data){
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    reset_token,
                    reset_token_expires,
                    is_admin,
                    created_at,
                    updated_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            `

            let password = crypto.randomBytes(8).toString("hex")
            password = await hash(password, 8)

            //Criação do Token
            const token = crypto.randomBytes(20).toString("hex")
            
            //Expiração do Token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            const values = [
                data.name,
                data.email,
                password,
                token,
                now,
                data.is_admin,
                date(Date.now()).iso,
                date(Date.now()).iso
            ]

            return db.query(query, values)

        } catch (err) {
            console.error(err)
        }
    },

    showUser(id){
        try {
            return db.query(`SELECT * FROM users WHERE id = $1`, [id])      
            
        } catch (err) {
            console.error(err)
        }
    },

    async delete(id){
        try {
            //pegando as receitas
            let results = await db.query('SELECT * FROM recipes WHERE user_id = $1', [id])
            const recipes = results.rows

            //pegando todas as imagens da receita
            const allFilesPromise = recipes.map(async recipe => 
                await Files.delete(recipe.id)
            )

            await db.query(`DELETE * FROM users WHERE id = $1`, [id])
            
        } catch (err) {
            console.error(err)
        }
    }

}


