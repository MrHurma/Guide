const search = document.querySelectorAll('.search__sort_item')
let sort = document.querySelectorAll('.sort')

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

for(let i = 0; i < search.length; i++) {
    search[i].addEventListener("click", function() {
        if(search[i].textContent == 'Парки'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'none'
            })
            document.querySelectorAll('.sort__parks').forEach(sort => sort.parentElement.parentElement.style.display = 'block')
        }
        if(search[i].textContent == 'Памятники'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'none'
            })
            document.querySelectorAll('.sort__pamyat').forEach(sort => sort.parentElement.parentElement.style.display = 'block')
        }
        if(search[i].textContent == 'Музеи'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'none'
            })
            document.querySelectorAll('.sort__museam').forEach(sort => sort.parentElement.parentElement.style.display = 'block')
        }
        if(search[i].textContent == 'Храмы'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'none'
            })
            document.querySelectorAll('.sort__hram').forEach(sort => sort.parentElement.parentElement.style.display = 'block')
        }
        if(search[i].textContent == 'Исторические места'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'none'
            })
            document.querySelectorAll('.sort__places').forEach(sort => sort.parentElement.parentElement.style.display = 'block')
        }
        if(search[i].textContent == 'Очистить'){
            sort.forEach(sort => {
                sort.parentElement.parentElement.style.display = 'block'
                showPage(currentPage)
            })
        }
    });
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
const gui = 'https://672cae281600dda5a9f974a0.mockapi.io/cards/';
let request = new XMLHttpRequest();
let titleSrch = document.querySelectorAll('.search__title');
let textSrch = document.querySelectorAll('.search__text');
request.open("GET", gui);
request.responseType = "json";

request.onload = function () {
    const bam = textContent = request.response;
    let o = 0;
    titleSrch.forEach(titleSrch =>{
        titleSrch.innerHTML = bam[o].title
        o += 1
    });
    o = 0
    textSrch.forEach(textSrch =>{
        textSrch.innerHTML = bam[o].text
        o += 1
    });
    o = 0
    sort.forEach(sort =>{
        sort.innerHTML = bam[o].type
        o += 1
    });
};

request.send();