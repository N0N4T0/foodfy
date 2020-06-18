const modalCard = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for(let card of cards) {
    card.addEventListener('click', function(){
        modalCard.classList.add('active')
    })
}

document.querySelector('.close-modal').addEventListener('click', function(){
    modalCard.classList.remove('active')    
})