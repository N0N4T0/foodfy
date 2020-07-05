const data = require("../data.json")

exports.index = function(req, res) {

    return res.render('admin/index')
}


//
exports.create = function(req, res){
    return res.render('admin/create')
}

// exports.put = function(req, res){
//     return res.render('admin/edit')
// }