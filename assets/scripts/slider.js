let ind = 0
const allImg = document.querySelectorAll('.slider__img')
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

setInterval(function(){
    replacePhoto()
}, 10000);