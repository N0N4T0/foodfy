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