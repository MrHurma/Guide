const gui = 'https://672cae281600dda5a9f974a0.mockapi.io/cards/';
let request = new XMLHttpRequest();
request.open("GET", gui);
request.responseType = "json";

request.onload = function () {
    const bam = textContent = request.response;
    let o = 0;
    items.forEach((items) => {
        items.innerHTML = `
        <div class="search__img_box">
            <img src="${bam[o].img}" alt="" class="search__img">
        </div>
        <div class="search__text_box">
            <h3 class="search__title">${bam[o].title}</h3>
            <p class="search__text">${bam[o].text}</p>
            <p class="sort">${bam[o].type}</p>
        </div>`;
        o++;
    })
};
request.send();

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
        currentPage-=1;
        showPage(currentPage);
    }
});
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage+=1;
        showPage(currentPage);
    }
});
sort = document.querySelectorAll('.sort')
for(let i = 0; i < search.length; i++) {
    search[i].addEventListener("click", function() {
        const text = search[i].textContent;
        items.forEach(card => {
            card.style.display = 'none';
        });
        if (text === 'Очистить') {
            items.forEach(card => {
                card.style.display = 'flex';
            });
        } else {
            items.forEach(card => {
                const sortText = card.querySelector('.sort').textContent;
                if (sortText === text) {
                    card.style.display = 'flex';
                }
            });
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
