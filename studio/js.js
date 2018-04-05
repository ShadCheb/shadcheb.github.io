/*var slideBtn = document.getElementsByClassName('header-slide-btn');

var slideBtnLeft = slideBtn[0];
var slideBtnRight = slideBtn[1];*/

var slideWidth = 1440;

var slideArena = document.querySelector('.header-slide-arena');

var slideArray = {
	'header-slide-content': {
		'left': document.querySelector('.header-slide-btn.left'),
		'right':  document.querySelector('.header-slide-btn.right'),
		'arena': document.querySelector('.header-slide-arena'),
		'width': 1440
	},
	'about-us-arena': {
		'left': document.querySelector('.about-us-btn.left'),
		'right': document.querySelector('.about-us-btn.right'),
		'arena': document.querySelector('.about-us-block-list'),
		'width': 1036
	}
};

//(slideArray.mainSlid.arena, slideArray.mainSlid.leftBtn, slideArray.mainSlid.rightBtn)
var event = new Event('ckick');

slideArray['header-slide-content'].right.addEventListener('click', nextSlide);
slideArray['header-slide-content'].left.addEventListener('click', prevSlide);

slideArray['about-us-arena'].right.addEventListener('click', nextSlide);
slideArray['about-us-arena'].left.addEventListener('click', prevSlide);

var functionClick = slideArray['header-slide-content'].right;
	

function autoClick(){
	var currentSlide = parseInt(slideArray['header-slide-content'].arena.dataset.current);
	var clickEvent = new Event('click');
	if(currentSlide == slideArray['header-slide-content'].arena.children.length - 1){
		functionClick = slideArray['header-slide-content'].left;
	}
	if(currentSlide == 0){
		functionClick = slideArray['header-slide-content'].right;
	}

	functionClick.dispatchEvent(clickEvent);
}


setInterval(autoClick, 2000);

if(parseInt(slideArray['header-slide-content'].arena.dataset.current) == 0) slideArray['header-slide-content'].left.style.display = 'none';
if(parseInt(slideArray['about-us-arena'].arena.dataset.current) == 0) slideArray['about-us-arena'].left.style.display = 'none';


function nextSlide(evt){
	var target = evt.target;
	var address = slideArray[target.parentNode.classList.value];
	var currentSlide = parseInt(address.arena.dataset.current);


	currentSlide = currentSlide + 1;

	if(currentSlide >= address.arena.children.length - 1){
		address.right.style.display = 'none';
	}
	address.left.style.display = 'block';
	address.arena.style.left = -currentSlide*address.width + 'px';

	address.arena.dataset.current = currentSlide;
}

function prevSlide(evt){
	var target = evt.target;
	var address = slideArray[target.parentNode.classList.value];
	var currentSlide = parseInt(address.arena.dataset.current);

	currentSlide = currentSlide - 1;

	if(currentSlide <= 0){
		address.left.style.display = 'none';
	}
	address.right.style.display = 'block';
	address.arena.style.left = -currentSlide*(address.width - 1) + 'px';

	address.arena.dataset.current = currentSlide;
}


var filter = 'all';

var filterConformity = {
	'all-courses': 'all',
	'brows-courses': 'brows',
	'eyelashes-courses': 'lashes',
	'lips-courses': 'lips'
};

var containerCourses = [];
var filteredContainerCourses = [];

var container = document.querySelector('.courses-content-main');

var coursesFilter = document.querySelector('.courses-filter').children;

for (var i = 0; i < coursesFilter.length; i++) {

    coursesFilter[i].addEventListener('click', selectedFilter);
}


function selectedFilter(event){
	var target = event.target;
	
	if(filterConformity[target.classList[0]] === filter){
		return;
	}
	filter = filterConformity[target.classList[0]];

	console.log(filter);

    for (var i = 0; i < coursesFilter.length; i++) {
        coursesFilter[i].classList.remove('courses-active');
    }

	target.classList.add('courses-active');

	container.innerHTML = ''

	setActiveFilter(filter);
}


/*Отрисовка в шаблоне*/
function getElementFromTemplate(data){
	var template = document.querySelector('#courses-template');
	var element;

    if('content' in template){
    	element = template.content.children[0].cloneNode(true);
    } else{
    	element = template.children[0].cloneNode(true);
    }

	var backgroundImage = new Image();
	var IMAGE_TIMEOUT = 10000;
	
	var imageLoadTimeout = setTimeout(function(){
		backgroundImage.src = '';
		element.classList.add('course-nophoto');
	}, IMAGE_TIMEOUT);

	// Изображения отличаются от обычных DOM-элементов тем, что
    // у после задания src они загружаются с сервера. Для проверки
    // загрузилось изображение или нет, существует событие load.
	backgroundImage.onload = function(){
		clearTimeout(imageLoadTimeout);
		element.querySelector('.courses-content-img').style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
	};
	backgroundImage.onerror = function(){
		element.classList.add('course-nophoto');
	};

	backgroundImage.src = data.img;

	element.getElementsByClassName('courses-content-h2')[0].firstElementChild.textContent = data.name;
	element.querySelector('.courses-content-durability').firstElementChild.textContent = data.durability;
	element.querySelector('.courses-content-price').firstElementChild.textContent = data.price;
	element.querySelector('.courses-content-durability').firstElementChild.textContent = data.durability;
	element.getElementsByClassName('courses-content-h2')[1].firstElementChild.textContent = data.name;
	element.querySelector('.courses-content-intended').firstElementChild.textContent = data.intended;
	element.querySelector('.courses-content-description').firstElementChild.textContent = data.description;
	
	return element;
}

function setActiveFilter(id){
	
	if (filter != 'all'){
		filteredContainerCourses = [];
		for (var i = 0; i < containerCourses.length; i++){
			if (containerCourses[i].category == filter || containerCourses[i].category == 'all'){
				filteredContainerCourses.push(containerCourses[i]);
			}
		}

	}
	else filteredContainerCourses = containerCourses.slice();

	renderContainer(filteredContainerCourses);
}

/**
   * Отрисовка списка продукции.
   */

function renderContainer(containerToRender){

	var fragment = document.createDocumentFragment();

	containerToRender.forEach(function(cont){
		var element = getElementFromTemplate(cont);
    	fragment.appendChild(element);
	});

	container.appendChild(fragment);
}

/*Загрузка данных*/
function __jsonpFunction(data){
	containerCourses = data;

	setActiveFilter(filter);
}

var scriptEl = document.createElement('script');
scriptEl.src = 'data.js';
document.body.appendChild(scriptEl);




/*Меню перемещение*/
var menuUpNavigation = document.querySelector('.menu-up-navigation>ul').children;


for(var i = 0; i < menuUpNavigation.length; i++){
	menuUpNavigation[i].addEventListener('click', move);
}

	function move(event){
		event.preventDefault();
		var hash = '.' + event.target.getAttribute('id');
		var V = 0.2;
		var w = window.pageYOffset;  // прокрутка
		
		var t = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
		var start = null;
		    if(hash == '.services') t = t - 70;
		    else if(hash == '.reviews') t = t - 120;
		    requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
		    function step(time) {
			    if (start === null) start = time;
			    var progress = time - start,
			        r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
			    window.scrollTo(0,r);
			    if (r != w + t) {
			        requestAnimationFrame(step)
			    } else {
			        location.hash = hash;  // URL с хэшем
		    	}
		    }
	}



/*Ссылка с логотипа на сайт*/
document.querySelector('.menu-up-logo').addEventListener('click', function(){
	location.href = 'index.html';
});







