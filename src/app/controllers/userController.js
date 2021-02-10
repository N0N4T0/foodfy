const { hash } = require("bcryptjs")
const crypto = require("crypto")

const mailer = require('../../lib/mailer')

const User = require('../models/User')

module.exports = {
    list(req, res){
        return res.render('admin/users/profile-list')
    },

    create(req, res){
       return res.render('admin/users/create')
    // return res.send('Rota de exibição') 
    },

    async post(req, res){
        try {
            const { name, email, is_admin } = req.body

            const password = crypto.randomBytes(10).toString("hex")
            const encryptedPassword = await hash(password, 8)

            const userId = await User.create({
                name,
                email,
                password: encryptedPassword,
                is_admin
            })

            req.session.userId = userId

            const user = await User.findOne({
                where: { id: userId }
            })

            await mailer.sendMail({
                from: "admin@foodfy.com.br",
                to: user.email,
                subject: "Boas vindas do Foodfy",
                html:`
                    <h2>Olá usuário!</h2>

                    <p>Seja bem vindx ao Foodfy, o seu site de receitas!</p><br>
                    <p>Está é a sua senha temporária. A mesma pode ser alterada em seu perfil.</p>
                    
                    <h4>Sua senha: ${password}</h4>

                    <p>
                        <a href="http://localhost:3000/users/login" target="_blank">
                            Realizar login
                        <a/>
                    </p>
                `

            })

        } catch (err) {
            console.error(err)
        }
    }
}