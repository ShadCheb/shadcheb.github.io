var idToFilter = {
	'filter-price': 'По цене',
	'filter-name': 'По имени',
	'filter-default': 'По умолчанию'
};



var addressToContainer = {
	'meat.html': 'meat',
	'fish.html': 'fish',
	'cheese.html': 'cheese'
};


var searchWorld = document.querySelector('#icon-search'); //Слово для поиска
var PAGE_SEARCH = 'search.html';  //страница поиска
addressToContainer[PAGE_SEARCH] = 'all';


var scrollTimeout;

var loadedData = null; /*Данные с data.js*/
var container = document.querySelector('.meat-product');

var containerProduct = [];
var filteredContainerProduct = [];
var PAGE_SIZE = 9;
var currentPage = 0;

var activeFilter = "filter-default";
var filters = document.querySelector('.type-sort-list');

var product = addressToContainer[address()];

var searchText = '';
var btnSearch = document.querySelector('.btn-search');
var PAGE_SEARCH = 'search.html';

filters.addEventListener('click', function(evt){
	var clickElement = evt.target;
	if(clickElement.classList.contains('type-sort-filter')){
		setActiveFilter(clickElement.id);
	}
});

/*Поиск*/

btnSearch.addEventListener('click', function(){
	searchText = document.querySelector('#icon-search').value;
	console.log(searchText);
	if(searchText == '') {
		console.log('Пустая строка поиска');
		return;	
	}

	localStorage.setItem('kodSearch', searchText);
	location.href = 'search.html';
});

/*Функция для поиска */
function searchContainer(search){
	console.log(containerProduct);
	console.log('Слово для поиска: ' + search);
	search = search.toLowerCase();
	filteredContainerProduct = [];
	search = '/'+search+'/g';

	for(var i = 0; i < containerProduct.length; i++){
		if(containerProduct[i].name.match(eval(search))!=null) filteredContainerProduct.push(containerProduct[i]);
		
	}
	setActiveFilter(activeFilter, true);
}



/*
	filteredContainerProduct = [];
	if(search.length != 0){
		for(var i = 0; i < containerProduct.length; i++){
			if(containerProduct[i].category.toLowerCase().indexOf(search) > -1){
				filteredContainerProduct.push(containerProduct[i]);
			}
		}
		if(filteredContainerProduct.length == 0){
			console.log('Ничего не найдено');
			var message = 'По запросу \"' + search + '\" ничего не найдено.';
			container.innerHTML = message;
			return;
		} 
	}
	renderContainer(filteredContainerProduct, currentPage, true);
}*/


/*Загрузка по скролу*/

window.addEventListener('scroll', function(){
	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout(function(){
	  // Как определить что скролл внизу страницы и пора показать
      // следующую порцию отелей?
      // Проверить — виден ли футер страницы.
      // Как проверить виден ли футер страницы?
      // 1. определить положение футера относительно экрана (вьюпорта)
      var footerCoordinates = document.querySelector('footer').getBoundingClientRect();

      // 2. определить высоту экрана
      var viewportSize = window.innerHeight;

      // 3. если смещение футера минус высота экрана меньше высоты футера,
      //    футер виден хотя бы частично
      if(footerCoordinates.bottom - viewportSize <= footerCoordinates.height) {
      	if(currentPage <Math.ceil(filteredContainerProduct.length/PAGE_SIZE)){
      		renderContainer(filteredContainerProduct, ++currentPage);
      	}
      }
	}, 100);
});


  /**
   * Установка выбранного фильтра
   * @param {string} id
   * @param {boolean=} force Флаг, при котором игнорируется проверка
   *     на повторное присвоение фильтра.
   */
function setActiveFilter(id, force){
	// Предотвращение повторной установки одного и того же фильтра.
	if(activeFilter === id && !force){
		return;
	}

	var selectedElement = document.querySelector('#' + activeFilter);
	var selectedFilter = document.querySelector('.filter-selected');
	
	

	console.log(product);
	if (product != 'all'){
		filteredContainerProduct = [];
		for (var i = 0; i < containerProduct.length; i++){
			if (containerProduct[i].category == product){
				filteredContainerProduct.push(containerProduct[i]);
			}
		}
	}
	
	console.log(filteredContainerProduct);
	
	switch (id){
		case 'filter-name':
		filteredContainerProduct = filteredContainerProduct.sort(function(a,b){
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		});
		break;

		case 'filter-price':
		filteredContainerProduct = filteredContainerProduct.sort(function(a,b){
			return a.price - b.price;
		});
		break;

		case 'filter-default':
		break;
	}

	currentPage = 0;
	renderContainer(filteredContainerProduct, currentPage, true);
	activeFilter = id;
	selectedFilter.innerHTML = idToFilter[id];
}


/**
   * Отрисовка списка продукции.
   */

function renderContainer(containerToRender, pageNumber, replace){
	if(replace) {
		container.innerHTML = '';
	}

	var fragment = document.createDocumentFragment();

	var from = pageNumber * PAGE_SIZE;
	var to = from + PAGE_SIZE;
	var pageContainer = containerToRender.slice(from, to);

	pageContainer.forEach(function(cont){
		var element = getElementFromTemplate(cont);

	  // Для каждого из 50 элементов вызывается отрисовка в DOM.
      // Потенциально, это замедляет производительность в старых браузерах,
      // потому что пересчет параметров страницы будет производиться после
      // каждой вставки элемента на страницу. Чтобы этого избежать, пользуются
      // фрагментами, нодами вида DocumentFragment, которые представляют
      // собой контейнеры для других элементов.
    	fragment.appendChild(element);
	});

	container.appendChild(fragment);
}

/*Загрузка данных*/
function __jsonpFunction(data){
	containerProduct = data;
	if (product == 'all')  searchContainer(localStorage.getItem('kodSearch')); /*Выбор контента для загрузки в зависимости от страницы*/
	else setActiveFilter(activeFilter, true);
}



var scriptEl = document.createElement('script');
scriptEl.src = 'data.js';
document.body.appendChild(scriptEl);


/*Отрисовка в шаблоне*/
function getElementFromTemplate(data){
	var template = document.querySelector('#meatTemplate');
	var element;

	// Свойство content у шаблона не работает в IE,
    // поскольку он не поддерживает template. Поэтому для
    // IE нужно писать альтернативный вариант.

    // 'content' in template вернет true если template
    // является объектом DocumentFragment, в противном
    // случае — нет и мы будем знать что это IE.

    if('content' in template){  //'content' in template
    	element = template.content.children[0].cloneNode(true);
    } else{
    	element = template.children[0].cloneNode(true);
    }

	

	var backgroundImage = new Image();


	var IMAGE_TIMEOUT = 10000;
	
	var imageLoadTimeout = setTimeout(function(){
		backgroundImage.src = '';
		element.classList.add('meat-nophoto');
	}, IMAGE_TIMEOUT);

	// Изображения отличаются от обычных DOM-элементов тем, что
    // у после задания src они загружаются с сервера. Для проверки
    // загрузилось изображение или нет, существует событие load.
	backgroundImage.onload = function(){
		clearTimeout(imageLoadTimeout);
		element.querySelector('.meat-img').style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
	};
	backgroundImage.onerror = function(){
		element.classList.add('meat-nophoto');
	};

	backgroundImage.src = data.img;

	element.querySelector('.meat-name').textContent = data.name;
	
	return element;
}


/*Определение адреса страницы*/
function address(){
	var locationAddress = window.location.pathname;
	var locationOpenFile = '';


	for(var i = locationAddress.length; i >= 0; i--){
		if (locationAddress[i] == '/') {
			locationOpenFileFunction(i);
			break;
		}
	}

	function locationOpenFileFunction(simbol){
		for (var i = simbol + 1; i < locationAddress.length; i++){
			locationOpenFile += locationAddress[i];
		}
	}

	return locationOpenFile;
}

