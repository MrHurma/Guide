const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
let reques = new XMLHttpRequest();
const cardMap = document.querySelector('.card__adress_box')
cardMap.appendChild(document.createElement('div'))
reques.open("GET", guide);
reques.responseType = "json";

reques.onload = () => {
    const get = textContent = reques.response;
    let indx = 0;
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
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    `;
};

reques.send();

<div style="position:relative;overflow:hidden;">
    <iframe src="${getItem.src_map}" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
</div>