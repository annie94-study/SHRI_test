var cities = {};
var CurrentLast = '';

var NO_LETTER = 'NO LETTER';
var NO_CITIES_LEFT = 'NO CITIES LEFT';
var BAD_CITY = 'BAD CITY';
var EMPTY_CITY = 'EMPTY CITY';
var WRONG_FIRST_LETTER = 'WRONG FIRST LETTER';
var SUCCESS = 'SUCESS';

function getFirstLetter(city) {
	return city[0].toLowerCase();
}

function getLastLetter(city) {
	for (var i = city.length - 1; i >= 0; i--) {
		var letter = city[i].toLowerCase();
		if (letter in cities) {
			return letter;
		}
	}
	return NO_LETTER;
}

function tryGetCity(letter) {
	if (letter in cities == false) {
		return NO_LETTER;
	}
	if (cities[letter].all.length == cities[letter].nused) {
		return NO_CITIES_LEFT;
	}
	var idx = cities[letter].index;
	var idxCity = cities[letter].all[idx];
	while (cities[letter].used[idxCity]) {
		idx += 1;
		idxCity = cities[letter].all[idx];
	}
	cities[letter].used[idxCity] = true;
	cities[letter].nused += 1;
	cities[letter].index = idx;
	return idxCity;
}

function updateHistory(city, css_class) {
	var newitem = '<li class="' + css_class + '">' + city + '</li> \n';
	$('#history').html(newitem + $('#history').html());
}

function updateCurrentLast(letter) {
	CurrentLast = letter;
	$('#hint').html("Введите город на букву '" + CurrentLast.toUpperCase() + "'");
}

function submitCity(city) { 
	var first = getFirstLetter(city);
	cities[first].used[city] = true;
	cities[first].nused += 1;

	updateHistory(city, 'site_city');
	var last = getLastLetter(city); 
	updateCurrentLast(last); 
	safeDrawCity(city); 
	return SUCCESS;
}

function tryProcessEnemy(city) {
	if (city.length == 0) {
		return EMPTY_CITY;
	}
	if (CurrentLast != getFirstLetter(city)) {
		return WRONG_FIRST_LETTER;
	}
	if (city in cities[CurrentLast].used == false) {
		return BAD_CITY;
	}
	cities[CurrentLast].used[city] = true;
	cities[CurrentLast].nused += 1;
	updateHistory(city, 'user_city');

	var last = getLastLetter(city);
	if (last == NO_LETTER) {
		return NO_LETTER;
	}
	var siteCity = tryGetCity(last);
	if (siteCity == NO_LETTER || siteCity == NO_CITIES_LEFT) {
		return siteCity;
	}

	return submitCity(siteCity);
}

function firstMove(city) { 
	if (city.length == 0) {
		return EMPTY_CITY;
	} 
	var first = getFirstLetter(city); 
	if (city in cities[first].used == false) {
		return BAD_CITY;
	} 
	return submitCity(city);
}

function startGame() {
  $.get('../data/cities.txt', function(data) {
		var citiesList = data.split(' ');
		for (var i = 0; i < citiesList.length; i++) { 
			var first = getFirstLetter(citiesList[i]);  
			if (first in cities == false) { 
				cities[first] = {
					'all' : [],
					'index' : 0,
					'used' : {},
					'nused' : 0
				};
			} 
			cities[first].all.push(citiesList[i]); 
			cities[first].used[citiesList[i]] = false;
		} 

		firstMove('Минск');
	});
}

$(document).ready(function() {
	startGame();

	$('#answer-btn').click(function() {
		var city = $('#answer').val();
		if (city.length > 0) {
			var res = tryProcessEnemy(city);
			if (res != SUCCESS) {
				alert (res);
			} else {
				$('#answer').val('');
			}
		}
	})
});
