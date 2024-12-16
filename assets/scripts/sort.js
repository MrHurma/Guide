// 
// fetch запрос для загрузки карточек
// 
const gui = 'https://672cae281600dda5a9f974a0.mockapi.io/cards/';
const sortBoxesBlock = document.querySelector('.search__block');
let currentFilters = [];
async function loadCards() {
    try {
        const response = await fetch(gui);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const bam = await response.json();
        displayCards(bam);
        Pagination(bam);
    } catch (error) {
        console.error(`Ошибка fetch запроса: ${error}`);
    }
}

function displayCards(cards) {
    sortBoxesBlock.innerHTML = '';
    cards.forEach(card => {
        const box = document.createElement('div');
        box.classList.add('search__box');
        box.innerHTML = `
            <div class="search__img_box">
                <img src="${card.img}" alt="" class="search__img">
            </div>
            <div class="search__text_box">
                <h3 class="search__title">${card.title}</h3>
                <p class="search__text">${card.text}</p>
                <p class="sort">${card.type}</p>
            </div>`;
        sortBoxesBlock.appendChild(box);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    setupSorting();
    setupSearch();
});

// 
// Пагинация
// 
function Pagination(cards) {
    const itemsPerPage = 10;
    let currentPage = 1;
    function showPage(page) {
        const totalPages = Math.ceil(cards.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        sortBoxesBlock.querySelectorAll('.search__box').forEach(item => {
            item.style.display = 'none';
        });
        cards.slice(startIndex, endIndex).forEach(item => {
            const box = document.createElement('div');
            box.classList.add('search__box');
            box.innerHTML = `
                <div class="search__img_box">
                    <img src="${item.img}" alt="" class="search__img">
                </div>
                <div class="search__text_box">
                    <h3 class="search__title">${item.title}</h3>
                    <p class="search__text">${item.text}</p>
                    <p class="sort">${item.type}</p>
                </div>`;
            sortBoxesBlock.appendChild(box);
        });
        updatePagination(totalPages);
    }
    function updatePagination(totalPages) {
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
            currentPage -= 1;
            showPage(currentPage);
        }
    });
    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < Math.ceil(cards.length / itemsPerPage)) {
            currentPage += 1;
            showPage(currentPage);
        }
    });
    showPage(currentPage);
}

// 
// Сортировка
// 
function setupSorting() {
    const sortInput = document.querySelectorAll('.search__sort_input');
    sortInput.forEach(input => {
        input.addEventListener('change', filterResults);
    });
    document.getElementById('Clear').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.search__sort_input');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        currentFilters = [];
        loadCards();
    });
    async function filterResults() {
        currentFilters = Array.from(sortInput)
            .filter(input => input.checked)
            .map(input => input.nextElementSibling.textContent);

        const response = await fetch(gui);
        const allData = await response.json();
        const filteredData = allData.filter(item => {
            return currentFilters.length === 0 || currentFilters.includes(item.type);
        });
        displayCards(filteredData);
        Pagination(filteredData);
    }
}

// 
// Поиск
// 
function setupSearch() {
    document.getElementById('search').addEventListener('input', async function() {
        const searchTerm = this.value.toLowerCase();
        const response = await fetch(gui);
        const cards = await response.json();
        const filteredCards = cards.filter(card => {
            const title = card.title.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = currentFilters.length === 0 || currentFilters.includes(card.type);
            return matchesSearch && matchesFilter;
        });
        displayCards(filteredCards);
        Pagination(filteredCards);
    });
}

// 
// Загрузка карточек
// 
document.addEventListener('DOMContentLoaded', () => {
    loadCards();
});