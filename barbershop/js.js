var link = document.querySelector(".login");
var popup = document.querySelector(".modal-content");
var popupMap = document.querySelector(".modal-content-map");
var openMap = document.getElementsByClassName("open-map");
var close = document.getElementsByClassName("modal-content-close");
var form = popup.querySelector("form");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var storage = localStorage.getItem("login");
var leftBtn = document.querySelector(".gallery-prev");
var rightBtn = document.querySelector(".gallery-next");
var gallery = document.querySelector(".gallery-content");

/*leftBtn.addEventListener("click", leftFunction);
rightBtn.addEventListener("click", rightFunction);*/

function leftFunction(){
	
}

link.addEventListener("click", openEnterFunction);

for (var i = 0; i < openMap.length; i++) {
	openMap[i].addEventListener("click", openMapFunction);
}
for (var i = 0; i < close.length; i++) {
	close[i].addEventListener("click", closeFunction);
}
form.addEventListener("submit", function(e){
	if (!(login.value && password.value)){
		e.preventDefault();
		popup.classList.add("modal-error");
	} else {
			localStorage.setItem("login", login.value);
			if (popup.classList.contains("modal-error")){
				popup.classList.remove("modal-error");
			}
	}
});


function openMapFunction(e){
	e.preventDefault();
	popupMap.classList.add("modal-content-show");
}

function openEnterFunction(e){
	e.preventDefault();
	popup.classList.add("modal-content-show");
	if (storage) {
		login.value = storage;
		password.focus();
	} else {
		login.focus();
	}
}

function closeFunction(e){
	e.preventDefault();
	popup.classList.remove("modal-content-show");
	popupMap.classList.remove("modal-content-show");
}

window.addEventListener("keydown", function(e){
	if (e.keyCode === 27) {
		if (popup.classList.contains("modal-content-show")){
			popup.classList.remove("modal-content-show");
		} else if(popupMap.classList.contains("modal-content-show")){
			popupMap.classList.remove("modal-content-show");
		}
	}
});


var arrayImg = ["img/picture.png", "img/picture-2.png"];
