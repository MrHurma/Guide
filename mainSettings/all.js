// 
// Бургер меню
// 
let count = 1
const nav = document.querySelector('.burger__links');
const line1 = document.querySelector('.burger__line_1')
const line2 = document.querySelector('.burger__line_2')
const line3 = document.querySelector('.burger__line_3')
function burgerClick(){
    nav.classList.toggle('burger__a')
    if(count === 1){
        line2.style.display = 'none'
        line1.style.rotate = '45deg'
        line3.style.rotate = '-45deg'
        line3.style.margin = '-12px 0 0 0'
    }
    if(count != 1){
        count = 0
        line2.style.display = 'flex'
        line1.style.rotate = '0deg'
        line3.style.rotate = '0deg'
        line3.style.margin = '0'
    }
    count += 1
}
const burgerLog = document.querySelector('.burger__btn')
burgerLog.addEventListener('click', () => {
    alert('Данная функция еще не добавлена извините')
});

// 
// Реализация прелоадера
// 
const boddy = document.querySelector('.body');
document.addEventListener('DOMContentLoaded', () => {
    const preload = document.getElementById('preloader');
    window.onload = () => {
        setTimeout(() => {
            preload.style.opacity = '0';
            setTimeout(() => {
                preload.style.display = 'none';
                boddy.style['overflow-y'] = 'visible';
            }, 600);
        }, 500);
    };
});

