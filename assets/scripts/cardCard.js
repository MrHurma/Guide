// 
// Загрузка параметров выбранной карточки
// 
const body = document.querySelector('.body')
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
                        <span class="modal__close" id="closeModal">❌</span>
                        <div class="modal__block">
                            <button class="modal__btn" id="prevBtn">◀</button>
                            <img src="" alt="" class="modal__img" id="modalImage">    
                            <button class="modal__btn" id="nextBtn">▶</button>
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
                <div class="comment">
                    <h2 class="comment__title">Комментарии:</h2>
                    <div id="commentsList" class="comment__list"></div>
                    <h2>Написать комментарий:</h2>
                    <form id="commentForm" class="comment__form">
                        <input type="text" id="commentName" class="comment__name" placeholder="Имя" required>
                        <textarea id="commentDescription" class="comment__description" placeholder="Комментарий" required></textarea>
                        <button class="comment__btn" type="submit">Добавить комментарий</button>
                    </form>
                </div>
            </div>
            `;

        const commentForm = document.getElementById('commentForm');
        const commentsList = document.getElementById('commentsList');
        const loadComments = async () => {
            try {
                const response = await fetch(`https://67615efe6be7889dc360cbf2.mockapi.io/comment?cardId=${card.id}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке комментариев');
                }
                const comments = await response.json();
                commentsList.innerHTML = comments.map(comment => `
                    <div class="comment__comment">
                        <span class="comment__name"><span class="comment__span">Имя пользователя:</span> ${comment.name}</span>
                        <p class="comment__text"><span class="comment__span">Комментарий:</span> ${comment.description}</p>
                    </div>
                `).join('');
            } catch (error) {
                console.error(`Ошибка при загрузке комментариев: ${error}`);
            }
        };
        loadComments();
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('commentName').value;
            const description = document.getElementById('commentDescription').value;
            const newComment = {
                name,
                description,
                cardId: card.id
            };
            try {
                const response = await fetch('https://67615efe6be7889dc360cbf2.mockapi.io/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment),
                });
                if (!response.ok) {
                    throw new Error('Ошибка при добавлении комментария');
                }
                commentForm.reset();
                loadComments();
            } catch (error) {
                console.error(`Ошибка при добавлении комментария: ${error}`);
            }
        });
        
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
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentImageIndex = 0;
        const openModal = () => {
            modal.style.display = 'block';
            modalImage.src = card.img[currentImageIndex];
            body.style.overflow = 'hidden';
        };
        const modalOpenImages = document.querySelectorAll('.card__img');
        modalOpenImages.forEach(img => {
            img.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                openModal(index);
            });
        });
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            body.style.overflow = 'visible';
        });
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + card.img.length) % card.img.length;
            modalImage.src = card.img[currentImageIndex];
        });
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % card.img.length;
            modalImage.src = card.img[currentImageIndex];
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