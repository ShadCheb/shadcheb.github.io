var price_iphone6plus = {
	mem16gb: 0,
	mem32gb: 2500
};

function Iphone6Plus(price, img){
	this.price = price;
	this.img = img;
}

var goldIphone6Plus = new Iphone6Plus(22500, "gold.png");
var blackIphone6Plus = new Iphone6Plus(20000, "black.png");
var silverIphone6Plus = new Iphone6Plus(21000, "silver.png");


var colorPhone = document.querySelector(".color").children;
var memoryPhone = document.querySelector(".memory").children;

for(var i = 0; i < colorPhone.length; i++){
	var colorSelect = colorPhone[i];
	colorSelect.addEventListener("click", onClickColor);
}

for(var i = 0; i < memoryPhone.length; i++){
	var colorSelect = memoryPhone[i];
	colorSelect.addEventListener("click", onClickMemory);
}


function selectImg(id){
	document.getElementById("imgiphone6plus").src = "img/iphone6+/" + id + ".png";
}

function selectPriceColor(id){
	selectImg(id);
	if(id === "black") return blackIphone6Plus.price;
	else if(id === "gold") return goldIphone6Plus.price;
	else if(id === "silver") return silverIphone6Plus.price;
}

function selectPriceMemory(id){
	if(id === "mem-16gb") return price_iphone6plus.mem16gb;
	else if(id === "mem-32gb") return price_iphone6plus.mem32gb;
}

var priceColor = 20000;
var priceMemory = 0;

function onClickColor(event){
	removeSelected(colorPhone);
	var target = event.target;
    addSelect(target);
    priceColor = selectPriceColor(target.id);
    var price = document.getElementById("price-iphone6plus")
    price.innerHTML = priceColor + priceMemory;
}

function onClickMemory(event){
	removeSelected(memoryPhone);
	var target = event.target;
	addSelect(target);
	priceMemory = selectPriceMemory(target.id);
	var price = document.getElementById("price-iphone6plus");
	price.innerHTML = priceColor + priceMemory;
}

function removeSelected(arg){
	for(var i = 0; i < arg.length; i++){
		arg[i].classList.remove("selected");
	}
}

function addSelect(arg){
	arg.classList.add("selected");
}