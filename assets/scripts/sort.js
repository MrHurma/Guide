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
    card3.style.display = 'block';
    card4.style.display = 'none';
    card5.style.display = 'none';
    card6.style.display = 'none';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function clickPamyat(){
    card1.style.display = 'block';
    card2.style.display = 'none';
    card3.style.display = 'none';
    card4.style.display = 'none';
    card5.style.display = 'none';
    card6.style.display = 'none';
    card7.style.display = 'block';
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
    card8.style.display = 'block';
}
function clickHram(){
    card1.style.display = 'none';
    card2.style.display = 'none';
    card3.style.display = 'none';
    card4.style.display = 'none';
    card5.style.display = 'block';
    card6.style.display = 'none';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function clickPlace(){
    card1.style.display = 'none';
    card2.style.display = 'block';
    card3.style.display = 'none';
    card4.style.display = 'block';
    card5.style.display = 'none';
    card6.style.display = 'block';
    card7.style.display = 'none';
    card8.style.display = 'none';
}
function Clear(){
    card1.style.display = 'block';
    card2.style.display = 'block';
    card3.style.display = 'block';
    card4.style.display = 'block';
    card5.style.display = 'block';
    card6.style.display = 'block';
    card7.style.display = 'block';
    card8.style.display = 'block';
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