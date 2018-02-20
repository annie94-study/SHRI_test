ymaps.ready(init);

function init() {
    // Создаем карту с нужным центром.
    var map = new ymaps.Map("map", {
        center: [53.9, 27.55],
        zoom: 10
    });
}

function safeDrawCity(city) {
	// TODO
}
