// 
// fetch запрос для загрузки карточек
// 
const gui = 'https://672cae281600dda5a9f974a0.mockapi.io/cards/';

fetch(gui)
    .then(response => {
        if (!response.ok){
            throw new Error('Ошибка при загрузке данных');
        };
        return response.json();
    }) .then(bam => {
        let o = 0
        items.forEach(item =>{
            item.innerHTML = `
            <div class="search__img_box">
                <img src="${bam[o].img}" alt="" class="search__img">
            </div>
            <div class="search__text_box">
                <h3 class="search__title">${bam[o].title}</h3>
                <p class="search__text">${bam[o].text}</p>
                <p class="sort">${bam[o].type}</p>
            </div>`;
            o++;
        });
    }) .catch(error => {
        console.log(`Ошибка fetch запроса: ${error}`) ;
    });
    

const search = document.querySelectorAll('.search__sort_item');
let sort = document.querySelectorAll('.sort');

// 
// Пагинация
// 
const itemsPerPage = 10;
const items = document.querySelectorAll('.search__box');
const totalPages = Math.ceil(items.length / itemsPerPage);
let currentPage = 1;
function showPage(page) {
    items.forEach((item, index) => {
        item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'flex' : 'none';
    });
    updatePagination();
}
showPage(currentPage);
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

// 
// Сортировка
// 
const sortInput = document.querySelectorAll('.search__sort_input');
const sortBoxes = document.querySelectorAll('.search__box');
sortInput.forEach(input => {
    input.addEventListener('change', filterResults);
});
document.getElementById('Clear').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.search__sort_input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    filterResults();
});
function filterResults() {
    const selectedFilters = Array.from(sortInput)
        .filter(input => input.checked)
        .map(input => input.nextElementSibling.textContent);
    console.log(selectedFilters)
    sortBoxes.forEach(box => {
        const boxText = box.querySelector('.sort').textContent;
        if (selectedFilters.length === 0 || selectedFilters.includes(boxText)) {
            box.style.display = 'flex';
        } else {
            box.style.display = 'none';
        }
    });
};

// 
// Поиск
// 
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
