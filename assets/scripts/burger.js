var count = 1
const nav = document.querySelector('.burger__links');
const line1 = document.querySelector('.burger__line_1')
const line2 = document.querySelector('.burger__line_2')
const line3 = document.querySelector('.burger__line_3')
function burgerClick(){
    nav.classList.toggle('burger__a')
    if(count == 1){
        line2.style.display = 'none'
        line1.style.rotate = '45deg'
        line3.style.rotate = '-45deg'
        line3.style.margin = '-12px 0 0 0'
    }
    if(count > 1){
        count = 0
        line2.style.display = 'block'
        line1.style.rotate = '0deg'
        line3.style.rotate = '0deg'
        line3.style.margin = '0'
    }
    count += 1
    console.log(count)
}