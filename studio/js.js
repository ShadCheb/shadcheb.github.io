
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

//setInterval(autoClick, 2000);

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
	
    for (var i = 0; i < coursesFilter.length; i++) {
        coursesFilter[i].classList.remove('courses-active');
    }

	target.classList.add('courses-active');
	container.innerHTML = ''
	setActiveFilter(filter);
}

function addCoursesInForm(e){

	e.preventDefault();

	var target = e.target;

	if(target.getAttribute('data-id')){
		containerCourses.forEach(function(count){
			if(count['id'] == target.getAttribute('data-id')){
				boxServicesArr.push('Курс ' + count['name']);
			}
		});
		choiceContent.classList.add('modal-content-show');
	}
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
	element.querySelector('.courses-content-btn').dataset.id = data.id;
	
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
	container.addEventListener('click', addCoursesInForm); 
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
		    requestAnimationFrame(step);  // функция анимации
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



/*Хочу скидку*/



var discountBtn = document.querySelector('.discount-block');
var discountContent = document.querySelector('.modal-content-discount'); //Окно ПопАп Хочу скидку

var close = document.getElementsByClassName('modal-content-close');

var pricelistBtn = document.getElementsByClassName('service-btn'); //Кнопка Узнать цены
var pricelistContent = document.querySelector('.modal-content-pricelist'); //Окно ПопАп Прайс лист

var servicesCaption = document.getElementsByClassName('services-block-caption'); //Кнопка заголовок услуги в ПопАп Прайс Лист
var servicesList = document.getElementsByClassName('services-block-list'); //

var recordingBtn = document.getElementsByClassName('btn-entry-up'); //Кнопка для появления формы
var recordingBtnn = document.getElementsByClassName('courses-content-btn');
var recordingContent = document.querySelector('.modal-content-form'); //Окно Попап Форма записи
var choiceContent = document.querySelector('.modal-content-choice');

var overlay = document.querySelector('.overlay');

var boxArena = document.querySelector('.box-services-arena');

var containerForList = document.querySelector('.services-modal-list');
var servicesListData = [];

function __jsonpFunctionServices(data){
	servicesListData = data;
	renderingServicesHead(servicesListData);
}

var scriptServcses = document.createElement('script');
scriptServcses.src = 'data-service.js';
document.body.appendChild(scriptServcses);

var template = document.querySelector('#services-template');
var element;

//Объект содержащий ссылки на попап окна, в зависимости от нажатой кнопки
var popUpWindowArray = {
	'service-btn': pricelistContent,
	'discount-block': discountContent,
	'btn-entry-up': recordingContent
}
//Объект содержащий ссылки на попап окна, в зависимости от нажатой кнопки Закрыть
var popUpWindowClosedArray = {
	'modal-content-pricelist': pricelistContent,
	'modal-content-discount': discountContent,
	'modal-content-form': recordingContent,
	'modal-content-choice': choiceContent
}

var servicesBlock = document.querySelector('.services-block');


var boxServicesArr = [];

discountBtn.addEventListener('click', popupOpenFunction); //Обработчик кнопки Хочу скидку


//Обработчик закрытияна каждую кнопку
for (var i = 0; i < close.length; i++) {
	close[i].addEventListener('click', closeFunction);
}
//Обработчик на кнопки вызова формы для записи
for (var i = 0; i < recordingBtn.length; i++) {
	recordingBtn[i].addEventListener('click', popupOpenFunction);
}


function backgroundBlocker(event){
	if(event == 'open'){
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}
	else if(event == 'closed'){
		overlay.style.display = 'none';
		document.body.style.overflow = 'auto';
	}
}

function popupOpenChoice(){
	choiceContent.classList.add('modal-content-show');
	backgroundBlocker('open');
}

function renderingBoxServices(){

	/*Отрисовка массивас выбранными услугами*/
	var num = 0;
	var template = document.querySelector('#box-services-template');
	var boxServicesTemplate;

	if('content' in template){
    	boxServicesTemplate = template.content.children[0].cloneNode(true);
    } else{
    	boxServicesTemplate = template.children[0].cloneNode(true);
    }

	boxArena.textContent = '';

	boxServicesArr.forEach(function(elem){
		boxServicesTemplate.querySelector('.box-services-element p').textContent = elem;
		boxServicesTemplate.querySelector('.box-services-element-close').dataset.num = num;
		num = num +1;
		boxArena.appendChild(boxServicesTemplate.cloneNode(true));
	});
}

function popupOpenFunction(e){
	e.preventDefault();
	var popUpWindow = popUpWindowArray[e.target.classList[0]];
	popUpWindow.classList.add('modal-content-show');
			/*Проверка принадлежит ли нажатая кнопка вызову ПопАп окна с прайс листом*/
	if(e.target.classList[0] == 'service-btn') serviceChoice(e.target.getAttribute('data-id'));
	if(e.target.classList[0] == 'btn-entry-up') renderingBoxServices();
	backgroundBlocker('open');
}

function closeFunction(e){
	e.preventDefault();
	var popUpWindowClosed = popUpWindowClosedArray[e.target.parentElement.classList[0]];
	popUpWindowClosed.classList.remove("modal-content-show");
	if (e.target.parentElement.classList[0] == 'modal-content-choice') return;
	else backgroundBlocker('closed');
}


function closeAllPopUp(){
	for(var key in popUpWindowClosedArray){
		popUpWindowClosedArray[key].classList.remove('modal-content-show');
	}
}

window.addEventListener('keydown', function(e){
	if (e.keyCode === 27) {
		closeAllPopUp();
		backgroundBlocker('closed');
	}
});


/*Прайс-лист*/

if('content' in template){
    element = template.content.cloneNode(true);
} else{
    element = template.cloneNode(true);
}


function renderingServicesHead(bd){
	var current = 0;

	bd.forEach(function(count){
		var block = element.querySelector('.services-block');
		var blockServices = containerForList.appendChild(block.cloneNode(true));
		var servicesBlockCaption = element.querySelector('.services-block-caption');
		var servicesBlockList = element.querySelector('.services-block-list');
		var servicesBlockSubtitle = element.querySelector('.services-block-subtitle');

		servicesBlockCaption.dataset.current = current;
		servicesBlockCaption.firstElementChild.textContent = count.header;
		blockServices.appendChild(servicesBlockCaption.cloneNode(true));
		current++;

		blockServices.addEventListener('click', decorServices);

		var list = blockServices.appendChild(servicesBlockList.cloneNode(true));

		if('subtitle' in count){
			count.subtitle.forEach(function(countCount){
				servicesBlockSubtitle.textContent = countCount.sublitename;
				list.appendChild(servicesBlockSubtitle.cloneNode(true));
				countCount.data.forEach(function(countUnderUnder){
					list.appendChild(renderingServicesElement(countUnderUnder));
				});
			});
		}
		else{
			count.data.forEach(function(countUnder){
				list.appendChild(renderingServicesElement(countUnder));
			});
		}
	});
	for(var i = 0; i < servicesCaption.length; i++){
		servicesCaption[i].addEventListener("click", functionDeployment);
	}
}

function renderingServicesElement(coundUnder){
	var servicesBlockElem = element.querySelector('.services-block-elem').cloneNode(true);

	servicesBlockElem.querySelector('.services-elem-service').firstElementChild.textContent = coundUnder.name;
	servicesBlockElem.querySelector('.services-elem-price').firstElementChild.textContent = coundUnder.price;
	servicesBlockElem.querySelector('.services-elem-btn').dataset.id = coundUnder.id;

	return servicesBlockElem;
}

function functionDeployment(e){

	var target = e.target;
	if(target.tagName == 'P') target = e.target.parentElement;
	if(!target.classList.contains('click')){
		closeDeployment(servicesList);
		closeDeployment(servicesCaption);
		openDeployment(target);
		openDeployment(target.nextElementSibling);
	}
	else {
		closeDeployment(servicesList);
		closeDeployment(servicesCaption);
	}
	funcHeightScroll();
}


for(var i = 0; i < pricelistBtn.length; i++){
    pricelistBtn[i].addEventListener('click', popupOpenFunction);
}


function closeDeployment(cl){
	for(var i = 0; i < cl.length; i++){
		cl[i].classList.remove('click');
	}
}

function openDeployment(e){
	e.classList.add('click');
}


function serviceChoice(dataId){
	dataId = Number(dataId[dataId.length - 1] - 1);
	if(!servicesCaption[dataId].classList.contains('click')){
		var clickEvent = new Event('click');
		servicesCaption[dataId].dispatchEvent(clickEvent);
	}
	else return;
}


/*Переход от закупки до формы*/





function decorServices(e){
	var target = e.target;
	if(target.getAttribute('data-id')){
		popupOpenChoice();
		var nameService = target.parentElement.querySelector('.services-elem-service p').textContent;
		var headService = target.parentElement.parentElement.parentElement.querySelector('.services-block-caption p').textContent;
		boxServicesArr.push(headService + ' ' + nameService);
	}
}

/*Кнопка Оформить*/

var btnForm = document.querySelector('.btn-form');
btnForm.addEventListener('click', orderProcessing);

function orderProcessing(){
	renderingBoxServices();
	closeAllPopUp();

	recordingContent.classList.add('modal-content-show');
	backgroundBlocker('open');

	var eventClick = new Event('click');
	recordingBtn[0].dispatchEvent(eventClick);
}


/*Кнопка Добавить*/

var btnAdd = document.querySelector('.btn-add-service');
btnAdd.addEventListener('click', addInBox);

function addInBox(e){
	e.preventDefault();
	choiceContent.classList.remove('modal-content-show');
}

boxArena.addEventListener('click', deleteServiceInBox);

function deleteServiceInBox(e){
	var target = e.target;
	if(target.getAttribute('class') == 'box-services-element-close'){
		boxServicesArr.splice(target.getAttribute('data-num'),1);
		renderingBoxServices();
	}
}




/*Скролл*/

var scrollUp = document.querySelector('.scroll-up');
var scrollDown = document.querySelector('.scroll-down');
var scrollSlider = document.querySelector('.scroll-slider');
var windowBlock = document.querySelector('.window-block');
var contentBlock = document.querySelector('.services-modal-list');
var scrollBlock = document.querySelector('.scroll-block');

var heightShift = 0;

var step = 60;

var heightScroll;
var kf;


function  funcHeightScroll(){

	kf = (scrollBlock.offsetHeight - 2 * scrollUp.offsetHeight) / contentBlock.offsetHeight;
	console.log(contentBlock.offsetHeight);
	heightScroll = kf * windowBlock.offsetHeight;
	scrollSlider.style.height = heightScroll + 'px';
}


scrollDown.addEventListener('click', funcScrollDown);
scrollUp.addEventListener('click', funcScrollUp);


	scrollSlider.onmousedown = function(e){
		var scrollCoords = getCoords(scrollSlider);
		var shiftY = e.pageY - scrollCoords.top;
		var scrollBlockCoords = getCoords(scrollBlock);

		document.onmousemove = function(e){
	
			var newTop = e.pageY - shiftY - scrollBlockCoords.top;
			if(newTop < 0){
				newTop = 0;
			}

			var newButton = scrollBlock.offsetHeight - scrollSlider.offsetHeight;

			if(newTop > newButton - scrollDown.offsetHeight){
				newTop = newButton - scrollDown.offsetHeight;
			}
			shiftElements( - newTop / kf);
		
		document.onmouseup = function() {
        	document.onmousemove = document.onmouseup = null;
      	};

		scrollSlider.ondragstart = function() {
		    return false;
		};

		}
	}

function getCoords(elem){
	var box = elem.getBoundingClientRect();
	return{
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	}
}


function funcScrollDown(){
	step = 60;
	if(scrollSlider.getBoundingClientRect().bottom >= scrollDown.getBoundingClientRect().top) {
		return;
	}
	if(scrollSlider.getBoundingClientRect().bottom + step * kf > scrollDown.getBoundingClientRect().top){

		step = (scrollDown.getBoundingClientRect().top - scrollSlider.getBoundingClientRect().bottom) / kf;
	}

	heightShift = heightShift - step;
	shiftElements(heightShift);
}

function funcScrollUp(){
	step = 60;
	if(scrollSlider.getBoundingClientRect().top <= scrollUp.getBoundingClientRect().bottom) return;
	if(scrollSlider.getBoundingClientRect().top - step * kf < scrollUp.getBoundingClientRect().bottom){

		step = (scrollSlider.getBoundingClientRect().top - scrollUp.getBoundingClientRect().bottom) / kf;
	}
	heightShift = heightShift + step;
	shiftElements(heightShift);
}

function shiftElements(height){

	contentBlock.style.top = height + 'px';
	scrollSlider.style.top = -kf * height + scrollDown.offsetHeight + 'px';
}



/*Скролл Хочу скидку*/

var stockWindow = document.querySelector('.stock-window');
var stockList = document.querySelector('.stock-list');

var gradientUp = document.querySelector('.gradient-up');
var gradientDown = document.querySelector('.gradient-down');

var stepStock = 60;


stockList.onmousedown = function(e){
	var scrollCoords = getCoords(stockList);
	var shiftY = e.pageY - scrollCoords.top;
	var windowArea = getCoords(stockWindow);

	console.log(-(stockList.offsetHeight - windowArea.offsetHeight));

	document.onmousemove = function(e){
	
		var newTop = e.pageY - shiftY - windowArea.top;

		gradientUp.style.display = gradientDown.style.display = 'block';

		if(newTop > 0){
			newTop = 0;
			gradientUp.style.display = 'none';
		}

		if(newTop < -(stockList.offsetHeight - stockWindow.offsetHeight)){
			newTop = -(stockList.offsetHeight - stockWindow.offsetHeight);
			gradientDown.style.display = 'none';
		}
		

		stockList.style.top = newTop + 'px';

		document.onmouseup = function() {
	        document.onmousemove = document.onmouseup = null;
	    };

		scrollSlider.ondragstart = function() {
			return false;
		};

	}
}


if(stockWindow.addEventListener){
	if('onwell' in document){
		stockWindow.addEventListener('whel',onWhell);
	}else if('onmousewheel' in document){
		stockWindow.addEventListener('mousewheel', onWheel);
	}else{
		stockWindow.addEventListener('MozMousePixelScroll', onWheel);
	}
}else{
	stockWindow.attachEvent('onmousewheel', onWheel);
}

var shift = 0;

function onWheel(e){
	e = e || window.event;
	var delta = e.delaY || e.detail || e.wheelDelta;

	gradientUp.style.display = gradientDown.style.display = 'block';

	if(delta == 120){
		shift += 40;
		if(shift >= 0){
			shift = 0;
			gradientUp.style.display = 'none';
		}
	}
	if(delta == -120){
		shift += -40;
		if(shift <= -(stockList.offsetHeight - stockWindow.offsetHeight)){
			shift = -(stockList.offsetHeight - stockWindow.offsetHeight);
			gradientDown.style.display = 'none';
		}
	}
	
	stockList.style.top = shift + 'px';

	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}