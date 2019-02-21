const myApp = {};

myApp.init = function () {

	myApp.setup();

};
myApp.Url = ['https://opentdb.com/api.php?amount=32&category=18', 'https://opentdb.com/api.php?amount=15&category=19']


myApp.setup = function () {

}

$(function () {
	myApp.init();
})



/* myApp.requestApi = () => {
	for (i = 0; i < myApp.Url.length; i++) {
		$.ajax({
			url: myApp.Url[i],
			method: 'GET',
			dataType: 'json',


		}).then(function (results) {
			console.log(results)
		})

	}

} */




myApp.getUserInput = () => {

}