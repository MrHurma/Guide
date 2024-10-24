const modal = document.querySelector('#modal')
const body = document.querySelector('.body')
function Close(){
    modal.style.display = 'none'
    body.style.overflow = 'visible'
}
function openn(){
    modal.style.display = 'block'
    body.style.overflow = 'hidden'
}