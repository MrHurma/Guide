const map1 = document.querySelector('.maps__main')
const map2 = document.querySelector('.maps__cafe')
const map3 = document.querySelector('.maps__fun')
const map4 = document.querySelector('.maps__mall')
function main(){
    map1.style.display = 'block';
    map2.style.display = 'none';
    map3.style.display = 'none';
    map4.style.display = 'none';
}
function cafe(){
    map1.style.display = 'none';
    map2.style.display = 'block';
    map3.style.display = 'none';
    map4.style.display = 'none';
}
function fun(){
    map1.style.display = 'none';
    map2.style.display = 'none';
    map3.style.display = 'block';
    map4.style.display = 'none';
}
function mall(){
    map1.style.display = 'none';
    map2.style.display = 'none';
    map3.style.display = 'none';
    map4.style.display = 'block';
}