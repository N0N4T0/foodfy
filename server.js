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
    return res.render("index", { recipes: data })
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipes", function(req, res){
    return res.render("recipes", { recipes: data })
})

server.get("/recipes/:index", function(req, res){
    const index = req.params.index;

    const recipe = data.find(function(recipe){
        if(data[index]){
            return true
        }
    })

    if(!recipe){
        return res.send("Receita não encontrada")
    }

    return res.render("recipes", { recipe:data[index] })
})

//porta
server.listen(5000, function(){
    console.log("$#%%$#server is running")
})