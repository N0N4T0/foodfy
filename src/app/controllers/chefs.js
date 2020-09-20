const Chefs = require("../models/Chefs")
const File = require("../models/File")

module.exports = {
    async index(req, res) {
        const results = await Chefs.all()
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

        await Promise.all(imagesPromise)

        return res.render('main/chefs', { chefs })
    }

}