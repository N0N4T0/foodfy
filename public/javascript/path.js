//Selecionar active por página
const currentPage = location.pathname
const menuItems = document.querySelectorAll(".menu .menu_width a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}
console.log(currentPage)