var btn = document.getElementsByClassName("btn"); /*Кнопки выбора способа растановки кораблей*/

var arrShipsLocation = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Расположение ваших кораблей*/
var arrShipsLocationFire = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Допускаемое расположение Ваших кораблей*/

var arrShipsLocationEnemy = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Расположение кораблей противника*/
var arrShipsLocationEnemyFire = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Допустимое расположение кораблей противника*/


var arrShips = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Временное (общее) расположение кораблей*/
var arrShipsFire = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]; /*Временное (общее) расположение кораблей*/


var coordinate, coordinateShip;
var numberShots = 0; /*Количество выстрелов*/
var numberShotsEnemy = 0;
var numberShotsHit = 0; /*Количество попаданий*/
var numberShotsHitEnemy = 0;
var gameOver = 0; /*Игра окончена*/



for(var i = 0; i < btn.length; i++){
	btn[i].onclick = choiceSettings;
}

/*Функция выбора способарастановки кораблей*/
function choiceSettings(e){
	var target = e.target;
	var id = target.getAttribute("id");
	concealment("welcom");

	if(id === "btn_auto") {
		ships(arrShipsLocation, arrShipsLocationFire);
		appearanceShips(arrShipsLocation);
	}

	if(id === "btn_manually") {
		var popapMnl = document.querySelector(".popupManual");
		popapMnl.classList.add("showPopapManual");
	}

}



/*Функция скрытие окна*/
function concealment(windowClose){
	var variableWindowClose = document.querySelector("." + windowClose);
	variableWindowClose.setAttribute("class", "opacity");
}


/*Функция появления кораблей наполе из массива*/
function appearanceShips(arr){
	for(var x = 0; x < arr.length; x++){
		for(var y = 0; y < arr.length; y++){
			if (arr[y][x] === "1"){
				var id = '' + x + y;
				var koord = document.getElementById(id);
				koord.classList.add("hit");
			}
		}
	}
}


/*Функции автоматического расположениякораблей*/
var arrShipX = [];
var arrShipY = [];
var colShips,
	startPositionHorizontal,
	startPositionVertical,
	direction; /*Направление корабля 0-вертикаль, 1-горизонталь*/

	/*Функция выбора направления расположения*/
function randUpRight(){
	return Math.floor(Math.random()*2);
}

	/*Функция рандомного числа до n*/
function randStartPositionShip(n){
	return Math.floor(Math.random()*n);
}

	/*Очистка массива*/
function clear(){
	arrShipX.splice(0,arrShipX.length);
	arrShipY.splice(0,arrShipY.length);
}


/*Функция рандомного распределения кораблей*/
function ships(arrayShips, arrayShipsFire){
	for(var n = 3; n > 0; n--){  /*n-кол-во палуб(клеток) корабля*/
		colShips = 4 - n;  /*Кол-во кораблей n-палубных*/
		col = 0; /*Кол-во уже размещенных кораблей*/
		while(col < colShips){
			if(mainFunction()) {
				col = col + 1;
			}
		};

			/*Функция рандомного распределения текущего корабля*/
			function mainFunction(){
				startPositionHorizontal = randStartPositionShip(7);
				if (startPositionHorizontal > (7 - n)){
					direction = 0;
				}
				else {
					direction = randUpRight();
				}

				if (direction == 1) {
					startPositionVertical = randStartPositionShip(7);
					
					for(var x = 0; x < n; x++){
						arrShipX.push(startPositionHorizontal + x);
						arrShipY.push(startPositionVertical);
					}
				}
				else {
					startPositionVertical = randStartPositionShip(7 - n);
					for(var y = 0; y < n; y++){
						arrShipX.push(startPositionHorizontal);
						arrShipY.push(startPositionVertical + y);
					}
				}

				
					/*Проверка координат с полем*/
					for (var i = 0; i < n; i++){
						if(arrayShipsFire[arrShipY[i]][arrShipX[i]] == "1"){
							clear();
							return false;
						}
						else {
							arrayShips[arrShipY[i]][arrShipX[i]] = "1";
						}
					}

				/*console.log(arrShipX);
				console.log(arrShipY);*/

					/*Заполнение массива fire*/
					if(direction == 0){
						for(var x = -1; x < 2; x++){
							for(var y = -1; y <= n; y++){

								var b = arrShipY[0] + y;
								var c = arrShipX[0] + x;
								if (b >= 0 && b < 7 && c >= 0 && c < 7) {
									arrayShipsFire[b][c] = '1';
								}
							}
						}
					}
					else{
						for(var y = -1; y < 2; y++){
							for(var x = -1; x <= n; x++){


								var b = arrShipY[0] + y;
								var c = arrShipX[0] + x;
								if (b >= 0 && b < 7 && c >= 0 && c < 7) {
									arrayShipsFire[b][c] = '1';
								}
							}
						}
					}					

					clear();
					return true;
			}
	}
}


/*Растановка кораблей противника*/
	
ships(arrShipsLocationEnemy, arrShipsLocationEnemyFire);


/*Выстрелы по противнику*/

var cells = document.getElementsByClassName('cellE');

for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    cell.addEventListener("click", show);
}


var msgArea = document.querySelector(".messageArea");

/*Функция проверки на попадание и промах*/
function show(e){

	if(gameOver > 0) return false;

    var target = e.target;
    var id = target.getAttribute("id"); 
    var idNo = id.substr(1);   /* Убирает первый символ в id*/
    var numberX = Math.floor(idNo/10);
    var numberY = idNo%10;
    

    var coordinateShip = document.getElementById(id);

    if(target.getAttribute("class") != 'slip' || target.getAttribute("class") != 'hit'){
    	

       	numberShots = numberShots + 1; /*Общее количество выстрелов */
       	if (arrShipsLocationEnemy[numberY][numberX] === '1'){
            coordinateShip.setAttribute("class", "hit");
            numberShotsHit = numberShotsHit + 1;

            messegeArea("msgHit");

            if (numberShotsHit >= 10){
            	console.log("Игра закончена")
                gameOver = 1;
                win(1);
                return true;
            }
        }
        else{
            coordinateShip.setAttribute("class", "slip");
            messegeArea("msgSlip");
            enemyFire();
        }

    }

}

/*Функция выстрелов противника*/
function enemyFire(){
	var fireX = randStartPositionShip(7);
	var fireY = randStartPositionShip(7);
	var id = '' + fireX + fireY;
	var fireLocation = document.getElementById(id);
	if(fireLocation.getAttribute("class") != 'slip' && fireLocation.getAttribute("class") != 'hitEnemy'){
		
		numberShotsEnemy = numberShotsEnemy + 1;
		console.log(numberShotsEnemy);
		if(arrShipsLocation[fireY][fireX] === "1"){
			fireLocation.setAttribute("class", "hitEnemy");
			numberShotsHitEnemy = numberShotsHitEnemy + 1;

			console.log("Противник попал " + numberShotsHitEnemy);

			enemyFire();
            if (numberShotsHit >= 10){
            	gameOver = 2;
                win(2);
                return false;
            }
		}
		else {
			fireLocation.setAttribute("class", "slip");
			return false;
		}
	}
}

/*Определение победителя*/

var popupGO = document.querySelector(".popupGameOver");
var winMsg = document.querySelector(".winMessege");
var statMsg = document.querySelector(".stateMessege");
var imgMsg = document.querySelector(".imgMessege");

function win(game){

	if(game == 2){
		winMsg.innerHTML = "YOU LOSE";
		statMsg.innerHTML = "Ваш противник произвёл " + numberShotsEnemy + " выстрела(ов) для победы";
		imgMsg.classList.add("lose");
	}
	else{
		winMsg.innerHTML = "YOU WIN";
		statMsg.innerHTML = "Вы произвели " + numberShots + " выстрела(ов) для победы";
		imgMsg.classList.add("win");
	}
	
	popupGO.classList.add("show");

}


function messegeArea(msg){
    msgArea.classList.add(msg);

    setTimeout("msgArea.setAttribute('class', 'messageArea');", 1000);

}



/*Ручная растановка кораблей*/


var error = 0; /*Ошибка при растановке кораблей*/
var direction_R = 10; /*напрвление*/

var deckQuantity = 3; /*Количество палуб*/
var event;
var shipsNumber = 0;

/*
var shipsLocation = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];*/


var cellsA = document.getElementsByClassName('cellA');

for (var i = 0; i < cellsA.length; i++) {
    var cellA = cellsA[i];
    cellA.addEventListener("mouseover", accommodationOver);
    cellA.addEventListener("mouseout", accommodationOut);
    cellA.addEventListener("click", accommodationClick);
}


/*Функция очистки поля*/
function clearBattle(){
    for (var x = 0; x < 7; x++) {
        for (var y = 0;y < 7; y++){
            if (arrShipsLocation[y][x] != '1'){
                var cell_A = document.getElementById('2' + x + '' + y);
                cell_A.classList.remove("hit");
            }
        }
    }
}

window.addEventListener("keydown", function(e){
    if (e.keyCode === 82){
        if (direction_R === 10){
            direction_R = 1;
            clearBattle();
        } else {
            direction_R = 10;
            clearBattle();
        }
    }
});



/*Обработчик при клике*/
function accommodationClick(e){

    var target = e.target;
    var id = target.getAttribute("id").substr(1);

    /*Окончиание растановки кораблей*/
    if (deckQuantity === 0){
    	appearanceShips(arrShipsLocation);
        var popapMnl = document.querySelector(".popupManual");
        popapMnl.classList.remove("showPopapManual");
		/*popapMnl.getAttribute("class", "popupManual");*/
        return 0;
    }



    if (error == 0){
        
        for(var i = 0; i < deckQuantity; i++){
            var numberXY = +id + i * direction_R;
            if(numberXY/10 < 1){
                numberXY = '0' + numberXY;
            }
            var numberX = Math.floor(numberXY/10);
            var numberY = numberXY%10;
            numberXY = '2' + numberXY;
            
            if (arrShipsLocation[numberY][numberX] != '1'){

                arrShipsLocation[numberY][numberX] = '1';

                var deck = document.getElementById(numberXY);
                deck.classList.add("hit");

            }
        }

         /*Счетчик количества кораблей*/
        shipsNumber = shipsNumber + 1;
        if (shipsNumber === (4 - deckQuantity)){
            shipsNumber = 0;
            deckQuantity = deckQuantity - 1;
        }


    } else console.log("Ошибка");

}    



/*Обработчик при наведении*/
function accommodationOver(e){

    event = e;
    var target = e.target;
    var id = target.getAttribute("id").substr(1);
    
    for(var i = 0; i < deckQuantity; i++){
        var numberXY = +id + i * direction_R;
        if(numberXY/10 < 1){
            numberXY = '0' + numberXY;
        }

        if (Math.floor(numberXY / 10) < 7 && numberXY % 10 < 7){

			numberXY = '2' + numberXY;

            var deck = document.getElementById(numberXY);
            deck.classList.add("hit");
        } else error = 1;
    }



/*

    coordinateShip = document.getElementById(id);
    coordinateShip.setAttribute("class", "hit");

    if((numberX + 1) < 7){
        var deck_two = document.getElementById((numberX + 1) + '' + numberY);
        deck_two.setAttribute("class", "hit");
    }

    if((numberX + 2) < 7){
        var deck_three = document.getElementById((numberX + 2) + '' + numberY);
        deck_three.setAttribute("class", "hit");
    }*/
    
}


/*Обработчик при снятии наведения*/
function accommodationOut(e){

    event = e;
    var target = e.target;
    var id = target.getAttribute("id").substr(1);
    var numberX = Math.floor(id/10);
    var numberY = id%10;

    
    for(var i = 0; i < deckQuantity; i++){
        var numberXY = +id + i * direction_R;
        if(numberXY/10 < 1){
            numberXY = '0' + numberXY;
        }
        if (Math.floor(numberXY/10) < 7 && numberXY%10 < 7){

            var numberX = Math.floor(numberXY / 10);
            var numberY = numberXY % 10;
            if(arrShipsLocation[numberY][numberX] == '0'){
            	numberXY = '2' + numberXY;
            	var deck = document.getElementById(numberXY);
                deck.classList.remove("hit");
                error = 0;
            }
            else return 0;
        } else error = 1;
    }

}
