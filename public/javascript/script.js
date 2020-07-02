//Redirecionando para receita clicada
const cards = document.querySelectorAll('.card')

for(let card of cards) {
    card.addEventListener('click', function(){
        const recipeTitle = card.getAttribute('name')
        let valor = 0
        for(let card of cards){
            if(recipeTitle == card.getAttribute('name')){
                window.location.href = `/recipe/${valor}`
            }
            valor ++
        }
    })
}

//Selecionar active por página
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header nav a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

