// 
// Сохранение id выбранной карточки в адресную строку
// 
const searchCard = document.querySelectorAll('.search__box');
searchCard.forEach((searchCard, index) => {
    searchCard.addEventListener('click', () => {
    window.location.href = `./card.html?id=${index}`;
    });
});