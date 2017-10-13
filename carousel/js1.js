var left = document.getElementById("left");
left.onclick = clickLeft;
var right = document.getElementById("right");
right.onclick = clickRight;

var leftNow = 0;
var rightNow = 2;
var upNow = 1;


var pics = document.querySelector(".main").children


function clickLeft(){
	if(pics[leftNow - 1]){
		pics[rightNow].classList.remove("right");
		pics[rightNow].classList.add("shadow-right");
		pics[upNow].classList.remove("up");
		pics[upNow].classList.add("right");
		pics[leftNow].classList.remove("left");
		pics[leftNow].classList.add("up");
		pics[leftNow - 1].classList.remove("shadow-left");
		pics[leftNow - 1].classList.add("left");
		leftNow = leftNow - 1;
		rightNow = rightNow - 1;
		upNow = upNow - 1;
	}
	else return 1;
}
function clickRight(){
	if(pics[rightNow + 1]){
		pics[leftNow].classList.remove("left");
		pics[leftNow].classList.add("shadow-left");
		pics[upNow].classList.remove("up");
		pics[upNow].classList.add("left");
		pics[rightNow].classList.remove("right");
		pics[rightNow].classList.add("up");
		pics[rightNow + 1].classList.remove("shadow-right");
		pics[rightNow + 1].classList.add("right");
		leftNow = leftNow + 1;
		rightNow = rightNow + 1;
		upNow = upNow + 1;
	}
	else return 1;
}