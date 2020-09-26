const Chefs = require("../models/Chefs")
const File = require("../models/File")

module.exports = {
    async index(req, res) {
        let {limit, page} = req.query, offset
        limit = limit || 8
        page = page || 1
        offset = limit * (page - 1)
        const params = {limit, page, offset}

        const results = await Chefs.all(params)
        const chefs = results.rows

        async function getImage(fileId){
            let results = await File.find(fileId)
            const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
            return images[0]
        }

        const imagesPromise = chefs.map( async chef => {
            chef.avatar = await getImage(chef.file_id)
            return chef
        })

        const lastAdded = await Promise.all(imagesPromise)

        const pagination = {total: Math.ceil(chefs[0].total / limit), page}

        return res.render('main/chefs', { chefs: lastAdded, pagination })
    }

}