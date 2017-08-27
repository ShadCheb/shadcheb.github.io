var heads = document.getElementsByClassName("head");
var texts = document.getElementsByClassName("text");
var modal = document.getElementById("my-modal");
var images = document.getElementsByClassName("image");
var imagesModal = document.getElementById("imagesModel");
var span = document.getElementsByClassName("close")[0];


/*Открытие/закрытие списка*/
for(var i = 0; i < heads.length; i++){
    heads[i].onclick = handle;
}


function handle(event){
	var target = event.target;
	var id = target.getAttribute("data-id");
	if(!target.classList.contains('click')){
		closeBlock(texts);
		closeBlock(heads);
		openBlock(target);
		openBlock(document.getElementById(id));
	}
	else {
		closeBlock(texts);
		closeBlock(heads);
	}
	
}

function closeBlock(cl){
	for(var i = 0; i < cl.length; i++){
		cl[i].classList.remove("click");
	}
}

function openBlock(ev){
	ev.classList.add("click");
}


/*Модалное окно*/

for(var i = 0; i < images.length; i++){
    images[i].onclick = handleModal;
}

function handleModal(event){
	modal.classList.add("click");
	console.log(imagesModal);
	console.log(imagesModal.innerHTML);
	var trgt = event.target;
	console.log(event);
	console.log(trgt.src);
	imagesModal.src = trgt.src;

}
/*Закрытие модального окна*/
span.onclick = function(){
	modal.classList.remove("click");
}

window.onclick = function(event){
	if (event.target == modal){
		modal.classList.remove("click");
	}
}




/*
span.onclick = function(){
	modal.style.display = "none";
}

window.onclick = function(event){
	if (event.target == modal){
		modal.style.display = "none";
	}
}

images.onclick = handle();

function handle(event){
	modal.style.display ="block";
	var trgt = event.target;
	console.log(trgt);
} */
