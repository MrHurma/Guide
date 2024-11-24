const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');
const mainCard = document.getElementById('main');
const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
let reques = new XMLHttpRequest();
reques.open("GET", guide);
reques.responseType = "json";
reques.onload = () => {
    let get_El = reques.response;
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
        </div>
        `;
    };
};

reques.send();