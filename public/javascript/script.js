const cards = document.querySelectorAll('.card')

for(let card of cards) {
    card.addEventListener('click', function(){
        const recipeTitle = card.getAttribute('name')
        let valor = 0
        for(let card of cards){
            if(recipeTitle == card.getAttribute('name')){
                window.location.href = `/recipes/${valor}`
            }
            valor ++
        }
    })
}

