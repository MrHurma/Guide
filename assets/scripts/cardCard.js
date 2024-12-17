// 
// Загрузка параметров выбранной карточки
// 
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');
const mainCard = document.getElementById('main');
const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
fetch(guide)
    .then(response => {
        if (!response.ok){
            throw new Error('Ошибка при загрузке данных');
        };
        return response.json();
    }) .then(get_El => {
        if (cardId !== null && cardId < get_El.length) {
            const card = get_El[cardId];
            mainCard.innerHTML = 
            `
            <div class="card">
                <div class="card__all_block">
                    <div class="card__img_block">
                        <img src="${card.img[0]}" alt="" class="card__img">
                        <img src="${card.img[1]}" alt="" class="card__img">
                    </div>
                    <div id="modal" class="modal">
                        <span class="close" id="closeModal">❌</span>
                        <div class="modal-content">
                            <img src="${card.img[0]}" alt="" class="card__img">
                            <img src="${card.img[1]}" alt="" class="card__img">
                            <div class="modal-navigation">
                                <button id="prevBtn">◀</button>
                                <button id="nextBtn">▶</button>
                            </div>
                        </div>
                    </div>
                    <div class="card__block">
                        <h1 class="card__title">${card.title}</h1>
                        <div class="card__box">
                            <p class="card__text">${card.text}</p>
                            <div class="card__adress_box">
                                <p href="" class="card__adress">${card.address}</p>
                                <div style="position:relative;overflow:hidden;">
                                    <iframe src="${card.map}" frameborder="1" allowfullscreen="true" style="position:relative;" class="card__map"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="card__text_show">${card.text}</p>
                <span class="card__like" id="likeBtn">❤ ${card.likes}</span>
            </div>
            `;
            const likeBtn = document.getElementById('likeBtn');
            let liked = false;
            let currentLikes = card.likes;

            likeBtn.addEventListener('click', async () => {
                liked = !liked;
                currentLikes = liked ? currentLikes + 1 : currentLikes - 1;
                likeBtn.innerHTML = `❤ ${currentLikes}`;
                likeBtn.style.color = liked ? 'red' : 'black';
                try {
                    const updatedCard = {...card,likes: currentLikes};
                    const response = await fetch(`${guide}${card.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedCard),
                    });
                    if (!response.ok) {
                        throw new Error('Ошибка при обновлении лайков');
                    }
                } catch (error) {
                    console.error(`Ошибка при обновлении лайков: ${error}`);
                }
            });
    }}) .catch(error => {
        console.log(`Ошибка fetch запроса: ${error}`);
    });

// 
// Реализация кнопки возвращающей назад
// 
document.querySelector('.header__back').addEventListener('click', () => {
    window.history.back();
});