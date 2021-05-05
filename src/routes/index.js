const express = require('express')
const routes = express.Router()

const adminSection = require("./adminSection")
const publicSection = require("./publicSection")


//rotas
routes.use("/", publicSection)
routes.use("/admin", adminSection)

routes.get("/admin", function(req, res){
    return res.redirect("/admin/users/login")
})

module.exports = routes