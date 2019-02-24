// ======================INITIALIZE APP========================
const myApp = {};

// Comment out url array temporarily to work with just one set of data
myApp.Url = ['https://opentdb.com/api.php?amount=32&category=18&type=boolean', 'https://opentdb.com/api.php?amount=15&category=19&type=boolean']
myApp.allQuestions = [];//l'array est global, ce qui permet de les utiliser
myApp.questionCount = 0;
myApp.correctCount = 0;
myApp.askedCount = 0;

myApp.init = function () {
	myApp.startPlay();
	myApp.setup();
	myApp.cleanClass();
	myApp.answerPlay();
	myApp.playAgain();
	
};


// ===================DOCUMENT READY===================
$(function () {
	myApp.init();
}) // DOC READY ENDS



// =========================FUNCTIONS===============================


myApp.setup = function () {
	/* const apiQuestions = myApp.requestApi(); */
	const requestPromise = myApp.Url.map(function (a) {
		return myApp.requestApi(a);

	})
	$.when(...requestPromise).then(function (...responses) {//we use when and then to make sure that we doing nothing before get the response from Api

		responses.forEach(function (response) {
			myApp.createQuestionsArray(response[0].results) //we call the function here to avoid that it execute the function before getting response, so here because it's where we get the data

		})
		

	}).then(function(){
		myApp.shuffleArray(myApp.allQuestions)
	})

} // FUNCTION ENDS


myApp.requestApi = (url) => {
	return $.ajax({
		// only using one url for now for the MVP
		url: url,
		method: 'GET',
		dataType: 'json',
	});

} // FUNCTION ENDS


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

} // FUNCTION ENDS


// Display the next question in the myApp.allQuestions array
myApp.displayNextQuestion = function () {
	// remove feedback from buttons
	myApp.cleanClass();

	// show sectionQuestions
	$('.sectionQuestions').css('display', 'block');

	// clear the contents of the .questions giv
	$('.textQuestion').html('');

	// build string from the question value from the objects in the allQuestions array
	const questionString = myApp.allQuestions[myApp.questionCount].question;

	// display the questionString in the DOM, inside the .questions div
	$('.textQuestion').html(`${questionString}`);
} // FUNCTION ENDS


myApp.displaySectionScore = () => {

	// hide $('.sectionQuestions')
	$('.sectionQuestions').css('display', 'none');
	// display $('.sectionScore')
	$('.sectionScore').css('display', 'block');
	$('.scoreCount span').empty();
	$('.scoreCount span').text(myApp.correctCount);
} // FUNCTION ENDS


// checks the users choice with the answer,
// increases the questionCount
// if choice = answer, apply .correct class to button and increase correctCount
myApp.checkUserInput = (userChoice) => {

	// get answer from object in allQuestionsArray and store it in the answer variable
	const answer = myApp.allQuestions[myApp.questionCount].answer

	// increase the questionCount
	myApp.questionCount++
	console.log("questionCount", myApp.questionCount)
	myApp.askedCount++

	if (userChoice === answer) {
		// increase correctCount
		myApp.correctCount++
		// give positive feedback by applying class of .correct to checked button
		$('input[name=userChoice]:checked').addClass('correct');
		$('.feedback').html(`<p class="feedbackText" id="correctAnswer">Correct!</p>`);
		setTimeout(function(){
			$('.feedback').empty()
		}, 1000)
	} else {
		// give negative feedback by applying class of .wrong to checked button
		$('input[name=userChoice]:checked').addClass('wrong');
		$('.feedback').html(`<p class="feedbackText" id="wrongAnswer">Wrong!</p>`);
		setTimeout(function(){
			$('.feedback').empty()
		}, 1000)
		
	}

} // FUNCTION ENDS



// solution from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
// Array Shuffle Function (MUTATES ARRAY)
// shuffles the contents of an array
// returns the mutated array
//attention il faut eviter de l'appeler 2 fois mais comme on fait 2 calls from API because of the for loop
myApp.shuffleArray = function (array) {
	console.log("The array is shuffling!")
	// const array = myApp.allQuestions
	// for loop to iterate through array
	for (let i = array.length - 1; i > 0; i--) {
		// create random number and store in variable
		const randNum = Math.floor(Math.random() * (i + 1));
		// // use destructuring to exchange the values of the two array positions
		[array[i], array[randNum]] = [array[randNum], array[i]];

		// // non-destructuring method for exhanging array values
		// // create a temporary variable to store current array element
		// const temp = array[i];
		// // overwrite current array element with randomized array element
		// array[i] = array[randNum];
		// // use temp variable to add back the old current array into the randomized array element
		// array[randNum] = temp;

	}
	// return mutated array
	return array
} // FUNCTION ENDS

myApp.startGame = () => {

	myApp.cleanClass();
	// displays $('.sectionQuestions')
	$('.sectionQuestions').css('display', 'block');
	myApp.correctCount = 0;
	myApp.askedCount = 0;
	/* myApp.timer(); */
}
myApp.cleanClass = () => {
	// temporary display none
	$('.sectionQuestions').css('display', 'none');
	$('.sectionScore').css('display', 'none');
} // FUNCTION ENDS

// checks if the game ends, but counting how many questions are asked
myApp.checkGameEnding = function () {
	if (myApp.askedCount === 10) {
		// all 10 questions were answered, end game
		return true
	} else {
		// continue game
		return false
	}
} // FUNCTION ENDS

// reshuffle the questions array once 40 questions are asked
myApp.reshuffleArray = function () {
	if (myApp.questionCount === 40) {
		console.log("It's time to reshuffle")
		// shuffle the array
		myApp.shuffleArray(myApp.allQuestions)

		// reset the question count to 0, so the questions can be used again
		myApp.questionCount = 0
	}
} // FUNCTION ENDS


// ================================CLICK EVENTS============================


// on Start Game Button
myApp.startPlay = () => {

	$('.play').on('click', function (event) {
		event.preventDefault();
		// hides $('.playGame')
		$('.sectionInstructions').css('display', 'none');
		myApp.startGame();
		myApp.displayNextQuestion();
	})
} // CLICK EVENT ENDS


// on True/False Button
myApp.answerPlay = () => {
	$('input[name=userChoice]').on('click', function (event) {
		event.preventDefault();
		// save user's click choice as a variable
		const userChoice = $('input[name=userChoice]:checked').val();


		// check to see if user's choice matches correct answer
		myApp.checkUserInput(userChoice);
		// statement to check if the game is ending
		// if no, then continue to next question
		// if yes, then stop game and display score screen
		setTimeout(function(){
			if (myApp.checkGameEnding() === false) {
				myApp.displayNextQuestion();
			}
			else {
				myApp.displaySectionScore()
			}
		}, 1000)
	})

}// CLICK EVENT ENDS

// on Play Again Button
myApp.playAgain = () => {
	$('.playAgain').on('click', function (event) {
		console.log("We're playing again!")
		event.preventDefault();
		myApp.startGame();
		myApp.reshuffleArray();
	})

}// CLICK EVENT ENDS

// ========================GAME TIMER (DEFUNCT)==========================
/* myApp.timer = () => {
	let time = 0;

	for (let i = 60; i > -1; i--) { //to make i decrement from 20 to 0
		setTimeout((function (s) {
			return function () {
				myApp.decount(s);
			}
		})(i), time);

		time += 1000;
	}
}

myApp.decount = function (i) {
	$('.timerDecount').text(`${i} + s`);
	if (i === 0) {
		myApp.displaySectionScore();
	}
	else if (i > 0 && myApp.checkGameEnding() === false) {

	}
}; */