# apiProject4TriviaFun
We will create a trivia game!

1/ when the page is loaded, instructions appear with a button start
2/we use Api to provide questions
3/when user press start button he gets a question randomly 
4/2options true or false (button answer)
5/on press button answer we get userInput
6/compare userInput to the answer and provide feedback to user with changing the background color of the button, RED: Wrong answer / GREEN: Correct answer
7/transition to next question same process for each question
8/ after 40 questions, stop the game

 ====Stretch goal===
 avoid call API each time and make sure avoid repetition of question
add timer
add score 
The user can pause the game but he will loose point each 5 sec paused
firebase


=====JavaScript====

<!-- *Initializing Game*
1/ Display title screen and create Document Ready
2/ Create myApp object
3/ Create myApp.init() and myApp.setup() to initialize
4/ Create myApp.Url array with urls for API call
5/ Create myApp.questions array of objects{questions, answer}
6/ Make api call and use a for loop to implement the urls into the ajax calls
    a/ use .then() to get the questions and answers from the results of each api call
    b/ store that data in the myApp.questions array 
      myApp.questions.push(
        {
          results[i].question, 
          results[i].answer
        }
      )
7/ Write a function that randomizes a passed array's (a) order
    a/ use a for loop to loop through the array
    b/ create a random number (j)
    c/ exchange the current position (i) with the random number position (j) in the array
    d/ return the mutated array (a)
      / code block from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      } -->

<!-- 8/ *Starting the game* on click 'Start' event listener
    a/ hide title screen and display the play screen **startGame()**
    b/ display the first question
        i/ create variable to store the questionCount (starts at 0) and the correctCount (starts at 0)
        ii/ use jQuery selector to target the div.questionDisplay and then display myApp.questions[count].question
        iii/ listen for on click True/False from user
        iv/ increase questionCount by 1
        v/ compare user choice with myApp.questions[count].answer **checkUserInput**
            if userChoice === myApp.questions[count].answer then
              give positive feedback
              increase correctCount by 1
            else
              give negative feedback
        vi/ if questionCount%10 === 0, flip to next question **displayNextQuestion**
            1/ animated div.questionDisplay to show the next question (myApp.questions[count].question)
            2/ repeat steps iii/ to vii/
        vii/ else end game 

9/ *Ending the game* game ends once 
    a/ hide play screen and display end screen **startGame()**
    b/ display end game string "You got XX / 10 correct!"
        i/ use jQuery seletor to target span in end game string and display correctCount
    c/ listen for on click 'PLay again?'
        i/ increase timesPlayed counter by  (call the increaseTimesPlayed function)
        ii/ restart the game
            1/ hide end screen and display play screen -->


============CLICK EVENTS=============
<!-- // on Start Game Button
  //**startGame()**
  //**displayNextQuestion()**

// on True/False Button
  //**checkUserInput(userChoice)**
  // if **checkGameEnding()** === false
        //**displayNextQuestion()**
      // else **displaySectionScore()**

// on Play Again Button
  //**startGame()**
  //**reshuffleArray()** -->

=========FUNCTIONS TO MAKE============

<!-- startGame()
  // hides $('.playGame')
  // displays $('.sectionQuestions')
  // myApp.correctCount = 0

displayNextQuestion()
  // clean the class (correct/wrong)
  // $('.questions').empty()
  // $('.questions').html(nextQuestionString)

displaySectionScore()
  // hide $('.sectionQuestions')
  // display $('.sectionScore')
  // $('.scoreCount span').empty()
  // $('.scoreCount span').text(correctCount)

checkUserInput(userChoice)
  // myApp.questionCount++
  // if userChoice === correct_answer
    // myApp.correctCount++
    // give positive feedback
      // apply class of correct
  // else
    // give negative feedback
      // apply class of wrong

checkGameEnding()
  // if questionCount%10 === 0
      // return true
    // else 
      // return false

reshuffleArray()
  // if questionCount === 40 then
      // shuffleArray()
      // myApp.questionCount = 0 -->

==========STRETCH GOALS=============

add score 


The user can pause the game but he will loose point each 5 sec paused


firebase

