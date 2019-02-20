const myApp = {};

myApp.init = function () {

	myApp.setup();
};



myApp.setup = function () {
	myApp.myEncryptWords = [
		{ "hackeryou": "130C0E16101D241A20" },
		{ "18H00": "030A130202" },
		{ "red hat": "1D100F48130C1F" }
	]
}
$(function () {
	myApp.init();
})

myApp.requestApi = (userInput) => {
	$.ajax({
		url: 'http://api.trytodecrypt.com/encrypt',
		method: 'GET',
		dataType: 'json',
		data: {
			key: 'f5d3c98db90eee259b9c41beaa4ecdcd',
			id: 1,
			text: userInput
		}

	})
}
myApp.fetUserInput = () => {

}