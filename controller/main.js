const data = require("../data")



exports.index = function(req, res){
    return res.render("main/index", { recipes: data })
}

exports.about = function(req, res){
    return res.render("main/about")
}

exports.recipes = function(req, res){
    return res.render("main/recipes", { recipes: data })
}

exports.recipe = function(req, res){
    const index = req.params.index;

    const recipe = data.find(function(recipe){
        if(data[index]){
            return true
        }
    })

    if(!recipe){
        return res.send("Receita não encontrada")
    }

    return res.render("main/recipe", { recipe:data[index] })
}