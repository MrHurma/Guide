let ind = 0
const allImg = document.querySelectorAll('.slider__img')
const slider = document.getElementById('slider')
function replacePhoto(){
    allImg.forEach(allImg =>{
        allImg.style.display = 'none'
    })
    ind +=1
    if(ind > 4){ind = 0}
    allImg[ind].style.display = 'block'
}
function replacePhotoMin(){
    allImg.forEach(allImg =>{
        allImg.style.display = 'none'
    })
    ind -=1
    if(ind < 0){ind = 4}
    allImg[ind].style.display = 'block'
}

function set(){
    interval = setInterval(function(){
        replacePhoto();
    }, 10000);
};
function stop(){
    clearInterval(interval)
};
slider.addEventListener('mouseenter', stop)
slider.addEventListener('mouseleave', set)
set()