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



// solution from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	// Array Shuffle Function (MUTATES PASSED ARRAY)
		// shuffles the contents of an array
		// returns the mutated array
myApp.shuffleArray = function (array) {
	// for loop to iterate through array
	for (let i = 0; i <= array.length; i++) {
		// create random number and store in variable
		const randNum = Math.floor(Math.random() * (array.length + 1));
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