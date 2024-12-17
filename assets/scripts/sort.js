// 
// fetch запрос для загрузки карточек
// 
const gui = 'https://672cae281600dda5a9f974a0.mockapi.io/cards/';
const sortBoxesBlock = document.querySelector('.search__block');
let currentFilters = [];
const itemsPerPage = 10;
let currentPage = 1;

async function loadCards(page = 1) {
    try {
        const response = await fetch(gui);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const allCards = await response.json();
        const totalPages = Math.ceil(allCards.length / itemsPerPage);
        const filteredCards = allCards.filter(card => {
            return currentFilters.length === 0 || currentFilters.includes(card.type);
        });
        const popularCheckbox = document.getElementById('Popular');
        const lessPopularCheckbox = document.getElementById('!Popular');

        if (popularCheckbox.checked) {
            filteredCards.sort((a, b) => b.populary - a.populary);
        } else if (lessPopularCheckbox.checked) {
            filteredCards.sort((a, b) => a.populary - b.populary);
        }
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedCards = filteredCards.slice(startIndex, startIndex + itemsPerPage);
        displayCards(paginatedCards, filteredCards);
        Pagination(filteredCards.length, totalPages);
    } catch (error) {
        console.error(`Ошибка fetch запроса: ${error}`);
    }
}

function displayCards(cards, allFilteredCards) {
    sortBoxesBlock.innerHTML = '';
    cards.forEach((card, index) => {
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
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        box.addEventListener('click', async () => {
            try {
                const updatedCard = {...card, populary: card.populary + 1};
                const response = await fetch(`${gui}${card.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedCard),
                });
                if (!response.ok) {
                    throw new Error('Ошибка при обновлении популярности');
                }
                window.location.href = `./card.html?id=${globalIndex}`;
            } catch (error) {
                console.error(`Ошибка при обновлении популярности: ${error}`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCards();
    Sorting();
    Search();
});

// 
// Пагинация
// 
function Pagination(totalItems, totalPages) {
    const pageNumbersContainer = document.getElementById('page__numbers');
    pageNumbersContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNum = document.createElement('span');
        pageNum.textContent = i;
        pageNum.classList.add('page__num');
        pageNum.style.cursor = 'pointer';
        pageNum.addEventListener('click', () => {
            currentPage = i;
            loadCards(currentPage);
        });
        pageNumbersContainer.appendChild(pageNum);
    }
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadCards(currentPage);
        }
    });
    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            loadCards(currentPage);
        }
    });
}

// 
// Сортировка
// 
function Sorting() {
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
        loadCards(1);
    }
}

// 
// Поиск
// 
function Search() {
    document.getElementById('search').addEventListener('input', async function() {
        const searchTerm = this.value.toLowerCase();
        const response = await fetch(gui);
        const allCards = await response.json();
        const filteredCards = allCards.filter(card => {
            const title = card.title.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = currentFilters.length === 0 || currentFilters.includes(card.type);
            return matchesSearch && matchesFilter;
        });
        displayCards(filteredCards);
        Pagination(filteredCards.length, Math.ceil(filteredCards.length / itemsPerPage));
    });
}

// 
// Инициализация загрузки карточек
// 
document.addEventListener('DOMContentLoaded', () => {
    loadCards();
});