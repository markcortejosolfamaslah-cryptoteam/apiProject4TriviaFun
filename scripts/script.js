const myApp = {};

myApp.Url = ['https://opentdb.com/api.php?amount=32&category=18', 'https://opentdb.com/api.php?amount=15&category=19']
myApp.allQuestions = [];//l'array est global, ce qui permet de les utiliser

myApp.init = function () {

	myApp.setup();

};



myApp.setup = function () {
	const apiQuestions = myApp.requestApi();
}

$(function () {
	myApp.init();
})



myApp.requestApi = () => {
	let results = [];
	for (i = 0; i < myApp.Url.length; i++) {
		$.ajax({
			url: myApp.Url[i],
			method: 'GET',
			dataType: 'json',


		}).then(function (response) {//we use then to make sure that we doing nothing before get the response from Api
			myApp.createQuestionsArray(response.results)//we call the function here to avoid that it execute the function before getting response, so here because it's where we get the data
		})
	}
}


// we create a function to create a new array by filter data from api
myApp.createQuestionsArray = (apiResponse) => {
	const filtered = apiResponse.map(response => {
		const dataFiltered = {
			question: response.question,
			answer: response.correct_answer
		}
		return dataFiltered;
	})

	myApp.allQuestions = myApp.allQuestions.concat(filtered);//because we have 2 calls from API we need to concat the both to create only one array
	console.log(myApp.allQuestions)
}





myApp.getUserInput = () => {

}