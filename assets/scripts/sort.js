const search = document.querySelector('.search__input_search')
var card1 = document.querySelector('#card_1')
var card2 = document.querySelector('#card_2')
var card3 = document.querySelector('#card_3')
var card4 = document.querySelector('#card_4')
var card5 = document.querySelector('#card_5')
var card6 = document.querySelector('#card_6')
var card7 = document.querySelector('#card_7')
var card8 = document.querySelector('#card_8')
var text = search.textContent
function clickPark(){
    card1.style.display = 'none';
    card2.style.display = 'none';
    card3.style.display = 'flex';
    card4.style.display = 'none';
    card5.style.display = 'none';
    card6.style.display = 'none';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function clickPamyat(){
    card1.style.display = 'flex';
    card2.style.display = 'none';
    card3.style.display = 'none';
    card4.style.display = 'none';
    card5.style.display = 'none';
    card6.style.display = 'none';
    card7.style.display = 'flex';
    card8.style.display = 'none';
}
function clickMuseam(){
    card1.style.display = 'none';
    card2.style.display = 'none';
    card3.style.display = 'none';
    card4.style.display = 'none';
    card5.style.display = 'none';
    card6.style.display = 'none';
    card7.style.display = 'none';
    card8.style.display = 'flex';
}
function clickHram(){
    card1.style.display = 'none';
    card2.style.display = 'none';
    card3.style.display = 'none';
    card4.style.display = 'none';
    card5.style.display = 'flex';
    card6.style.display = 'none';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function clickPlace(){
    card1.style.display = 'none';
    card2.style.display = 'flex';
    card3.style.display = 'none';
    card4.style.display = 'flex';
    card5.style.display = 'none';
    card6.style.display = 'flex';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function Clear(){
    card1.style.display = 'flex';
    card2.style.display = 'flex';
    card3.style.display = 'flex';
    card4.style.display = 'flex';
    card5.style.display = 'flex';
    card6.style.display = 'flex';
    card7.style.display = 'flex';
    card8.style.display = 'flex';
}
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.search__box');
    cards.forEach(card => {
        const title = card.querySelector('.search__title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

const itemsPerPage = 4;
const items = document.querySelectorAll('.search__box');
const totalPages = Math.ceil(items.length / itemsPerPage);
let currentPage = 1;
function showPage(page) {
    items.forEach((item, index) => {
        item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'flex' : 'none';
    });
    updatePagination();
}
showPage(currentPage)
function updatePagination() {
    document.getElementById('page__numbers').innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNum = document.createElement('span');
        pageNum.textContent = i;
        pageNum.classList.add('page__num');
        pageNum.style.cursor = 'pointer';
        pageNum.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
        });
        document.getElementById('page__numbers').appendChild(pageNum);
    }
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
}
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});