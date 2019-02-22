const myApp = {};

// Comment out url array temporarily to work with just one set of data
myApp.Url = ['https://opentdb.com/api.php?amount=32&category=18&type=boolean', 'https://opentdb.com/api.php?amount=15&category=19&type=boolean']
myApp.allQuestions = [];//l'array est global, ce qui permet de les utiliser

myApp.init = function () {

	myApp.setup();
	myApp.cleanClass();
	myApp.startGame();

};



myApp.setup = function () {
	/* const apiQuestions = myApp.requestApi(); */
	const requestPromise = myApp.Url.map(function (a) {
		return myApp.requestApi(a);

	})
	$.when(...requestPromise).then(function (...responses) {//we use when and then to make sure that we doing nothing before get the response from Api

		responses.forEach(function (response) {
			myApp.createQuestionsArray(response[0].results) //we call the function here to avoid that it execute the function before getting response, so here because it's where we get the data

		})
		console.log(myApp.allQuestions)

	})

}


$(function () {
	myApp.init();
})



myApp.requestApi = (url) => {
	/* let results = []; */

	// for (i = 0; i < myApp.Url.length; i++) { // removed loop to limit to one AJAX call
	// } // ending tag for loop

	return $.ajax({
		// only using one url for now for the MVP
		url: url,
		method: 'GET',
		dataType: 'json',

	});
	/* .then(function (response) {//we use then to make sure that we doing nothing before get the response from Api
		myApp.createQuestionsArray(response.results)//we call the function here to avoid that it execute the function before getting response, so here because it's where we get the data
		console.log(myApp.allQuestions)
	}) */

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

}





myApp.getUserInput = () => {

}



// solution from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Array Shuffle Function (MUTATES PASSED ARRAY)
// shuffles the contents of an array
// returns the mutated array
//attention il faut eviter de l'appeler 2 fois mais comme on fait 2 calls from API because of the for loop
myApp.shuffleArray = function (array) {
	// for loop to iterate through array
	for (let i = 0; i <= array.length; i++) {
		// create random number and store in variable
		const randNum = Math.floor(Math.random() * (array.length + 1));
		// // create a temporary variable to store current array element
		// const temp = array[i];
		// // overwrite current array element with randomized array element
		// array[i] = array[randNum];
		// // use temp variable to add back the old current array into the randomized array element
		// array[randNum] = temp;
		// use destructuring to exchange the values of the two array positions
		[array[i], array[randNum]] = [array[randNum], array[i]];

	}
	// return mutated array
	return array
}
myApp.startGame = () => {
	$('.play').on('click', function (event) {
		myApp.cleanClass();
		//preventDefault event
		event.preventDefault();
		// hides $('.playGame')
		$('.sectionInstructions').css('display', 'none');
		// displays $('.sectionQuestions')
		$('.sectionQuestions').css('display', 'block');
		myApp.correctCount = 0
	})
}
myApp.cleanClass = () => {
	$('.sectionQuestions').css('display', 'none');
	$('.sectionScore').css('display', 'none');
}