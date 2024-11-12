const boddy = document.querySelector('.body');
document.addEventListener('DOMContentLoaded', function(){
    const preload = document.getElementById('main_preloader');
    window.onload = function(){
        preload.style.opacity = '0';
        setTimeout(function(){
            preload.style.display = 'none';
            boddy.style['overflow-y'] = 'visible';
        }, 700);
    };
});