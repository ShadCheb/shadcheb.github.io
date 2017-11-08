var arrPic = [];
arrPic.push("pic-0.png", "pic-1.png", "pic-2.png", "pic-3.png", "pic-4.png", "pic-5.png", "pic-6.png", "pic-7.png","pic-0.png");
var a = 1, b = 2, c = 3;



var right = document.getElementById("right");
right.onclick = mainRight;

var left = document.getElementById("left");
left.onclick = mainLeft;

var leftPic = document.getElementById("left-pic");
var rightPic = document.getElementById("right-pic");
var upPic = document.getElementById("up-pic");

function mainRight(){
	if(arrPic[c + 1]){
		a = a + 1;
		b = b + 1;
		c = c + 1;
		leftPic.src = "img/" + arrPic[a];
		rightPic.src = "img/" + arrPic[c];
		upPic.src = "img/" + arrPic[b];
	}
	else return 1;
}

function mainLeft(){
	if(arrPic[a - 1]){
		a = a - 1;
		b = b - 1;
		c = c - 1;
		leftPic.src = "img/" + arrPic[a];
		rightPic.src = "img/" + arrPic[c];
		upPic.src = "img/" + arrPic[b];
	}
}