var count = 1
const fs = document.querySelector('.slider__img_1')
const sc = document.querySelector('.slider__img_2')
const tr = document.querySelector('.slider__img_3')
const fr = document.querySelector('.slider__img_4')
const fv = document.querySelector('.slider__img_5')
function replacePhoto(){
    count += 1;
    console.log(count)
    if(count == 1){
        fs.style.display = 'block';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 2){
        fs.style.display = 'none';
        sc.style.display = 'block';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 3){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'block';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 4){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'block';
        fv.style.display = 'none';
    }
    if(count == 5){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'block';
    }
    if(count >= 5){
        count = 0
    }
}
function replacePhotoMin(){
    count -= 1
    console.log(count)
    if(count < 1){
        count = 5
    }
    if(count == 1){
        fs.style.display = 'block';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 2){
        fs.style.display = 'none';
        sc.style.display = 'block';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 3){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'block';
        fr.style.display = 'none';
        fv.style.display = 'none';
    }
    if(count == 4){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'block';
        fv.style.display = 'none';
    }
    if(count == 5){
        fs.style.display = 'none';
        sc.style.display = 'none';
        tr.style.display = 'none';
        fr.style.display = 'none';
        fv.style.display = 'block';
    }
}