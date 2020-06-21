const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const data = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("public/views", {
    express: server,
    autoescape: false,
    noCache: true
})

//rotas
server.get("/", function(req, res){
    return res.render("index", { recipe: data })
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipes", function(req, res){
    return res.render("recipes")
})

//porta
server.listen(5000, function(){
    console.log("$#%%$#server is running")
})