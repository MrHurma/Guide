const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
let reques = new XMLHttpRequest();
reques.open("GET", guide);
reques.responseType = "json";

reques.onload = () => {
    const get = textContent = reques.response;
    let indx = 4;
    console.log('wefwefwef');
    document.querySelector('.main').innerHTML = 
    `
    <div class="card" id="card">
        <div class="card__img_block">
            <img src="${get[indx].img[0]}" alt="" class="card__img">
            <img src="${get[indx].img[1]}" alt="" class="card__img">
        </div>
        <div class="card__block">
            <h1 class="card__title">${get[indx].title}</h1>
            <div class="card__box">
                <p class="card__text">${get[indx].text}</p>
                <div class="card__adress_box">
                    <a href="" class="card__adress">${get[indx].address}</a>
                    <div style="position:relative;overflow:hidden;">
                        <iframe src="${get[indx].map}" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

reques.send();

