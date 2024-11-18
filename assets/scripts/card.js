const guide = 'https://672cae281600dda5a9f974a0.mockapi.io/Card/';
let reques = new XMLHttpRequest();
const cardMap = document.querySelector('.card__adress_box')
cardMap.appendChild(document.createElement('div'))
reques.open("GET", guide);
reques.responseType = "json";

reques.onload = function () {
    const bam = textContent = reques.response;
    let o = 0;
    cardMap.innerHTML += bam[0].map
};

reques.send();

