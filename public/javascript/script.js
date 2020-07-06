//Redirecionando para receita clicada
const cards = document.querySelectorAll('.card')

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        let valor = 0
        valor += i
        window.location.href = `/recipes/${valor}`
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
// console.log(currentPage)

// 
const recipeInformations = document.querySelectorAll('.recipe-information')
for(let information of recipeInformations) {
    const hide = information.querySelector('.hide')

    hide.addEventListener('click', function() {
        information.querySelector('.information').classList.toggle('hidden')
        if (hide.innerHTML == 'ESCONDER') {
            hide.innerHTML = 'MOSTRAR'
        } else {
            hide.innerHTML = 'ESCONDER'
        }
    })
}

//
const addIngredient = document.querySelector('.add-ingredient')
    const addStep = document.querySelector('.add-step')

    function addField(idField, classField) {
        const id = document.querySelector(idField)
        const fieldContainer = document.querySelectorAll(classField)
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

        if (newField.children[0].value == '') 
            return false

        newField
            .children[0]
            .value = ''
        id.appendChild(newField)
    }

    addIngredient.addEventListener('click', function () {
        addField('#ingredients', '.ingredients')
    })

    addStep.addEventListener('click', function () {
        addField('#step', '.steps')
    })