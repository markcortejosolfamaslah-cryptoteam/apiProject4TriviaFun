const myApp = {};

// Comment out url array temporarily to work with just one set of data
myApp.Url = ['https://opentdb.com/api.php?amount=32&category=18&type=boolean', 'https://opentdb.com/api.php?amount=15&category=19&type=boolean']
myApp.allQuestions = [];//l'array est global, ce qui permet de les utiliser
myApp.questionCount = 0;

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

// Display the next question in the myApp.allQuestions array
myApp.displayNextQuestion = function () {
	// remove feedback from buttons
	myApp.cleanClass();

	// show sectionQuestions
	$('.sectionQuestions').css('display', 'block');

	// clear the contents of the .questions giv
	$('.questions').empty();

	// build string from the question value from the objects in the allQuestions array
	const questionString = myApp.allQuestions[myApp.questionCount].question;

	// display the questionString in the DOM, inside the .questions div
	$('.questions').html(`<p class="textQuestion">${questionString}</p>`);
}

// checks the users choice with the answer,
// increases the questionCount
// if choice = answer, apply .correct class to button and increase correctCount
// 
myApp.checkUserInput = (userChoice) => {
	console.log(userChoice)
	// get answer from object in allQuestionsArray and store it in the answer variable
	const answer = myApp.allQuestions[myApp.questionCount].answer
	console.log(answer)
	// increase the questionCount
	myApp.questionCount++

	if (userChoice === answer) {
		// increase correctCount
		myApp.correctCount++
		// give positive feedback by applying class of .correct to checked button
		$('input[name=userChoice]:checked').addClass('correct')

	} else {
		// give negative feedback by applying class of .wrong to checked button
		$('input[name=userChoice]:checked').addClass('wrong')

	}

}



// solution from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Array Shuffle Function (MUTATES ARRAY)
// shuffles the contents of an array
// returns the mutated array
//attention il faut eviter de l'appeler 2 fois mais comme on fait 2 calls from API because of the for loop
myApp.shuffleArray = function (array) {
	// const array = myApp.allQuestions
	// for loop to iterate through array
	for (let i = 0; i <= array.length; i++) {
		// create random number and store in variable
		const randNum = Math.floor(Math.random() * (array.length + 1));
		// // use destructuring to exchange the values of the two array positions
		// [array[i], array[randNum]] = [array[randNum], array[i]];

		// non-destructuring method for exhanging array values
		// create a temporary variable to store current array element
		const temp = array[i];
		// overwrite current array element with randomized array element
		array[i] = array[randNum];
		// use temp variable to add back the old current array into the randomized array element
		array[randNum] = temp;

	}
	// return mutated array
	return array
}
myApp.startGame = () => {

	myApp.cleanClass();
	//preventDefault event
	event.preventDefault();
	// hides $('.playGame')
	$('.sectionInstructions').css('display', 'none');
	// displays $('.sectionQuestions')
	$('.sectionQuestions').css('display', 'block');
	myApp.correctCount = 0

}
myApp.cleanClass = () => {
	// temporary display none
	$('.sectionQuestions').css('display', 'none');
	$('.sectionScore').css('display', 'none');

	// cleans button feedback styling
	$('.correct').removeClass('correct');
	$('.wrong').removeClass('wrong');
}

// checks if the game ends, but counting how many questions are asked
myApp.checkGameEnding = function () {
	if (myApp.questionCount % 10 === 0 && myApp.questionCount > 0) {
		// all 10 questions were answered, end game
		return true
	} else {
		// continue game
		return false
	}
}

// reshuffle the questions array once 40 questions are asked
myApp.reshuffleArray = function () {
	if (myApp.questionCount === 40) {
		// shuffle the array
		myApp.shuffleArray()

		// reset the question count to 0, so the questions can be used again
		myApp.questionCount = 0
	}
}
// on Start Game Button
const startPlay = () => {
	$('.play').on('click', function (event) {
		myApp.startGame();
		myApp.displayNextQuestion();
	});
}


