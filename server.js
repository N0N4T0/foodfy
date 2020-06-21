const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")


//rotas
server.get("/", function(req, res){
    return res.send("Hello World")
})

//porta
server.listen(5000, function(){
    console.log("$#%%$#server is running")
})