'use strict'

const STYLE_BORDER_BLUE = '2px solid #5199db';
const STYLE_BORDER_RED = '2px solid #e3071c';

function fixTheScroll(){
	document.body.style.overflow = 'hidden';
	document.getElementById("form").style.paddingRight = '17px';
}
	
function unlockTheScroll(){
	document.body.style.overflow = '';
	document.getElementById("form").style.paddingRight = '';
}

function citySearch(city){

	// Определение количества элементов в объекте
	// var counter = Object.keys(city).length;
	// console.log(counter);

	var argument = document.getElementById('autocomplete');
	var agr = argument.value;
	list.innerHTML = '';

		city.forEach(function(city){
			var clip = city.City.slice(0, agr.length);
			var licouter = document.getElementById('list').getElementsByTagName('li').length;

			if(clip.match(eval('{' + ('/' + agr + '/gi') + '}')) != null){
				if(licouter <= 4 && agr.length <= 2){
					var li = list.appendChild(document.createElement('li'));
					li.innerHTML = city.City;

				}else if ( agr.length > 2 ){
					var li = list.appendChild(document.createElement('li'));
					li.innerHTML = city.City;
				}
			}
		});
}

function loadDocument(){
	var xhr = new XMLHttpRequest();

	xhr.timeout = 30000;

	xhr.open('GET', 'list_of_cities.json', true);

	xhr.send();

	xhr.onreadystatechange = function(){
		if (xhr.readyState != 4) return;

		if (xhr.status != 200){
			list.innerHTML = '<li>Что-то пошло не так. Проверьте соединение с интернетом и попробуйте еще раз</li>' + '<li tabindex="1">Обновить</li>';
			document.getElementById("list").style.display = 'block';
			document.getElementById("autocomplete").style.border = STYLE_BORDER_RED;
		}else{
			try{
				var city = JSON.parse(xhr.responseText);
			}catch (e){
				list.innerHTML = '<li>Некорректный ответ' + e.message + '</li>';
			}
			// делаем задержку, в любом случае секунду
			setTimeout(function() {
				showCity(city);
			}, 1000);
			
		}
	}
}

function loadCity(){

	loadDocument();

	list.innerHTML = '<li class="inf"><div class="load"></div>&emsp;Загрузка</li>';
	document.getElementById("list").style.display = 'block';
	document.getElementById("list").style.height = '30px';
}

function showCity(city){

	citySearch(city);

	var licouter = document.getElementById('list').getElementsByTagName('li').length;

	for(var i = 0; i < licouter; i++){
		list.childNodes[i].tabIndex = i;
	}

	for(var i = 1; i <= 4; i++){
		if(licouter == i ){
			var x = i * 30;
			document.getElementById("list").style.height = x + 'px';
			document.getElementById("list").style.display = 'block';
		}
	}

	if(licouter == 5){
		list.appendChild(document.createElement('li')).innerHTML = '<p>Показано 5 найденных городов. <br> Уточните запрос, чтобы увидеть остальные</p>';
	}

	if (licouter > 4){
		document.getElementById("list").style.height = '200px';
		document.getElementById("list").style.display = 'block';
	}else if(licouter == 0 || event.keyCode == '8'){
		list.innerHTML = ' <li><p>Совпадений не найдено</p></li>';
	}
		if(licouter > 0){
		document.getElementById('list').childNodes[0].style.background = '#5199db';
		document.getElementById('list').childNodes[0].style.color = '#fff';
	}
	
	autocomplete.addEventListener('keydown', function(){
		if(licouter > 0 && event.keyCode == 13 && document.getElementById('autocomplete').value.length > 0){
			document.getElementById('autocomplete').value = document.getElementById('list').childNodes[0].textContent;
			list.style.display = 'none';
			event.preventDefault();
		}
	});
}

var numeric = ["81", "87", "69", "82", "84", "89", "85", "73", "79", "80" ,"219" ,"221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "90", "88", "67", "86", "66", "78", "77", "188", "190", "191", "192", "8", "49", "50", "51", "52", "53", "54", "55", "56", "57", "48"];

autocomplete.addEventListener('keydown', function(){
	document.getElementById("autocomplete").style.border = '';
	eror.innerHTML = '';

	for(var i = 0; i <= numeric.length; i++){
		if ( event.keyCode == numeric[i] ) {
			loadCity();
			document.getElementById("autocomplete").style.border = STYLE_BORDER_BLUE;
		}
	}

	switch (event.keyCode){
		case 8:
		case 27:
		document.getElementById("list").style.display = 'none';
		break;
	}

	var licouter = document.getElementById('list').getElementsByTagName('li').length;

	if (event.keyCode == 40 && licouter != 0){
		document.getElementById('list').childNodes[1].focus();
		document.getElementById("autocomplete").style.border = STYLE_BORDER_BLUE;
		document.getElementById('list').childNodes[0].style.background = '';
		document.getElementById('list').childNodes[0].style.color = '';

	}
});

autocomplete.addEventListener('focus', function(){
	document.getElementById("autocomplete").style.border = STYLE_BORDER_BLUE;

});

autocomplete.addEventListener('mouseover', function(){
	ymaps.ready(function() {
		var youcity = ymaps.geolocation.city;
		autocomplete.placeholder = "Возможно " + String(youcity);
	});
});

list.addEventListener('keydown', function(){

	var numActiveItem = document.activeElement.tabIndex;

	switch(event.keyCode){
		case 40:
		numActiveItem++;
		document.getElementById('list').childNodes[numActiveItem].focus();
		break;
		case 38:
		if(numActiveItem > 0){
			numActiveItem--;
			document.getElementById('list').childNodes[numActiveItem].focus();
		}
		break;
		case 13:
		event.preventDefault();
		document.getElementById('autocomplete').value = event.target.textContent;
		autocomplete.focus();
		document.getElementById("autocomplete").style.border = '';
		document.getElementById('list').style.display = 'none';
		break;
		case 27:
		document.getElementById("list").style.display = 'none';
		break;
	}

	for(var i = 0; i < 35; i++){
		if(event.keyCode == numeric[i]){
			document.getElementById('autocomplete').focus();
		}
	}
});

list.addEventListener('click', function(){
	document.getElementById('autocomplete').value = event.target.textContent;
	autocomplete.focus();
	document.getElementById("autocomplete").style.border = '';
	document.getElementById("list").style.display = 'none';
});

list.addEventListener('mouseover', function(){
	fixTheScroll();
});

list.addEventListener('mouseleave', function(){
	unlockTheScroll();
});


document.body.addEventListener('click', function(){
	document.getElementById("list").style.display = 'none';

	var licouter = document.getElementById('list').getElementsByTagName('li').length;

	unlockTheScroll();

	function checkSelected(){
		for(var i = 0; i < licouter; ++i){
			if(document.getElementById('autocomplete').value.toLowerCase() == document.getElementById('list').childNodes[i].textContent.toLowerCase()){
				list.style.display = 'none';
				return true;
				break;
			}
		}
		return false;
	}

	if(licouter > 0){
		if(checkSelected()){
			list.style.display = 'none';
		}else{
			eror.innerHTML = 'Выберите значение из списка';
			list.style.display = 'none';
			autocomplete.style.border = STYLE_BORDER_RED;
		}
	}
});

autocomplete.addEventListener('blur', function(){

	document.getElementById("autocomplete").style.border = '';

});