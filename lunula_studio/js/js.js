/* Паралакс */
var scene = document.getElementById('parallax-1');

var parallaxInstance = new Parallax(scene);


/*Меню*/

let menubtn = document.querySelector('.btn-menu');
let menuNav = document.querySelector('.main__nav');
let mainMenu = document.querySelector('.main__menu');
let recordLink = document.querySelector('.record_link');

recordLink.addEventListener('click', function(e) {
    e.preventDefault();

    let target = event.target;

    moveLink(target.dataset.menu);
});

menubtn.addEventListener('click', function(e) {
    e.stopPropagation();

    menubtn.classList.toggle('active');
    mainMenu.classList.toggle('open');
});

mainMenu.addEventListener('click', function(e) {
    e.stopPropagation();

    menubtn.classList.toggle('active');
    mainMenu.classList.toggle('open');
});

document.querySelector('.main__nav').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let target = event.target;

    if (target.tagName != 'A') return false;

    if (!target.dataset.menu) {
        window.open(target.href, '_blank')

        return;
    }

    moveLink(target.dataset.menu);

    menubtn.classList.remove('active');
    mainMenu.classList.remove('open');
});

function moveLink(link) {
    if (!link) return;
    link = '#' + link;
    let V = 0.2;
    let w = window.pageYOffset;  // прокрутка
    let t = document.querySelector(link).getBoundingClientRect().top;  // отступ от окна браузера до id
    let start = null;

    window.scrollTo(0,w + t);
}

lightGallery(document.querySelector('#gallery-master')); 