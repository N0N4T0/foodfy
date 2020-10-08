module.exports = {
    list(req, res){
        return res.render('admin/users/profile-list')
    },

    create(req, res){
       return res.render('admin/users/create')
    // return res.send('Rota de exibição') 
    }
}