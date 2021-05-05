const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");

module.exports = {
    async home(req, res) {
        let { filter } = req.query;

        let results = await Recipe.findBy(filter);
        let recipes = results.rows;

        for (let index = 0; index < recipes.length; index++) {
            results = await Recipe.files(recipes[index].id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }));

            if (files[0]) {
                recipes[index].image = files[0].src;
            } else {
                recipes[index].image = "//placehold.it/500x360";
            }
        }


        return res.render("public-access/home", { recipes, filter });

    },

    about(req, res) {
        return res.render("public-access/about");
    },

    async recipes(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page - 1);

        const params = {
            filter,
            page,
            limit,
            offset,
            async callback(recipes) {

                for (let index = 0; index < recipes.length; index++) {
                    results = await Recipe.files(recipes[index].id);
                    const files = results.rows.map(file => ({
                        ...file,
                        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                    }));

                    if (files[0]) {
                        recipes[index].image = files[0].src;
                    } else {
                        recipes[index].image = "//placehold.it/500x360";
                    }
                }

                if (recipes[0]) {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    };

                    return res.render("public-access/recipe/list", { recipes, pagination, filter });
                } else {
                    return res.render("public-access/recipe/list", { recipes, filter });
                }

            }
        };

        Recipe.paginate(params);
    },

    async specificRecipe(req, res) {
        let results = await Recipe.find(req.params.id);
        let recipe = results.rows[0];

        if (!recipe) return res.render("not-found/not-found");


        results = await Recipe.files(recipe.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        if (files[0]) {
            recipe.image = files[0].src;
        } else {
            recipe.image = "//placehold.it/500x360";
        }


        return res.render("public-access/recipe/specific", { recipe });
    },

    async chefs(req, res) {
        let results = await Chef.all();
        let chefs = results.rows;

        for (let index = 0; index < chefs.length; index++) {
            results = await Chef.files(chefs[index].id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }));

            if (files[0]) {
                chefs[index].image = files[0].src;
            } else {
                chefs[index].image = "//placehold.it/500x360";
            }
        }

        return res.render("public-access/chefs", { chefs });
    }
}

// module.exports = {
//     async index(req, res) {
//         let {limit, page} = req.query, offset
//         limit = limit || 6
//         page = page || 1
//         offset = limit * (page -1)
//         const params = {limit, page, offset}

//         let results = await Main.all(params)
//         const recipes = results.rows

//         if(!recipes) return res.send('Recipe Not Found!')

//         async function getImage(recipeId){
//             let results = await Main.files(recipeId)
//             const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
//             return images[0]
//         }

//         const imagesPromise = recipes.map( async recipe => {
//             recipe.image = await getImage(recipe.id)
//             return recipe
//         })

//         const lastAdded = await Promise.all(imagesPromise)

//         const pagination = {total: Math.ceil(recipes[0].total / limit), page} 

//         return res.render('main/index', { recipes:lastAdded, pagination })
//     },
    
//     about(req, res) {
//         return res.render('main/about')
//     },
    
//     async recipes(req, res) {
//         let {limit, page} = req.query, offset
        
//         page = page || 1
//         limit = limit || 6
//         let offset = limit * (page - 1)
        
//         const params = {
//             limit,
//             page,
//             offset}

//         let results = await Main.all(params)
//         const recipes = results.rows

//         if(!recipes) return res.send('Recipe Not Found!')

//         async function getImage(recipeId){
//             let results = await Main.files(recipeId)
//             const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
//             return images[0]
//         }

//         const imagesPromise = recipes.map( async recipe => {
//             recipe.image = await getImage(recipe.id)
//             return recipe
//         })

//         const lastAdded = await Promise.all(imagesPromise)

//         const pagination = {total: Math.ceil(recipes[0].total / limit), page} 

//         return res.render('main/recipes', { recipes: lastAdded, pagination })
//     },
    
//     async recipe(req, res) {
//         const {id} = req.params  
//         let results = await Main.find(id)
//         const recipe = results.rows[0]

//         if(!recipe) return res.send('Recipe not found!')

//         results = await Main.files(recipe.id)
//         let files = results.rows.map(file => ({
//             ...file,
//             src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
//         }))

//         return res.render('main/recipe', { recipe, files })
//     },

//     async searchRecipe(req, res) {
//         let {filter} = req.query

//         const params = {filter}

//         let results = await Main.findByRecipes(params)
//         const recipes = results.rows

//         if(!filter) return res.send('Por favor, digite algo para pesquisar!')
//         if(!recipes) return res.send('Recipe Not Found!')

//         async function getImage(recipeId){
//             let results = await Main.files(recipeId)
//             const images = results.rows.map(image => `${req.protocol}://${req.headers.host}${image.path.replace("public", "")}` )
//             return images[0]
//         }

//         const imagesPromise = recipes.map( async recipe => {
//             recipe.image = await getImage(recipe.id)
//             return recipe
//         })
        
//         const lastAdded = await Promise.all(imagesPromise)


//         return res.render("main/search", { recipes: lastAdded, filter })          
//     }
// }