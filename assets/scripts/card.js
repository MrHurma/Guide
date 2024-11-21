const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
let searchCard = document.querySelectorAll('.search__box');
const mainCard = document.getElementById('main')
let reques = new XMLHttpRequest();
reques.open("GET", guide);
reques.responseType = "json";
console.log(mainCard);

reques.onload = () => {
    let get_El = textContent = reques.response;
    searchCard.forEach((searchCard, index) => {
        searchCard.addEventListener('click', () => {
            mainCard.innerHTML = 
            `
            <div class="card">
                <div class="card__img_block">
                    <img src="${get_El[index].img[0]}" alt="" class="card__img">
                    <img src="${get_El[index].img[1]}" alt="" class="card__img">
                </div>
                <div class="card__block">
                    <h1 class="card__title">${get_El[index].title}</h1>
                    <div class="card__box">
                        <p class="card__text">${get_El[index].text}</p>
                        <div class="card__adress_box">
                            <p href="" class="card__adress">${get_El[index].address}</p>
                            <div style="position:relative;overflow:hidden;">
                                <iframe src="${get_El[index].map}" frameborder="1" allowfullscreen="true" style="position:relative;" class="card__map"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    });
};

reques.send();

