var viewModel = {
	stackChoice: ko.observable(),

	// actual values
	currentCardPosition: ko.observable(),
	currentCardValue: ko.observable(),
	currentCardSuit: ko.observable(),
	// user values
	currentCorrect: ko.observable(),
	userCardPosition: ko.observable(null),
	userCardValue: ko.observable(null),
	userCardSuit: ko.observable(null),
	
	// other things we use
	currentBank: ko.observableArray([1, 2, 3, 4, 5, 6, 7]),
	randomSeed:ko.observable(),
	scores: ko.observableArray(),
	// totalAttempts:ko.computed(), TODO
	// totalCorrect:ko.computed(), TODO

	// visibility
	welcomeVisible: ko.observable(true),
	appVisible:ko.observable(false),
	questionStyleAVisible:ko.observable(false),
	questionStyleBVisible:ko.observable(false),
	questionStyleCVisible:ko.observable(false),
	questionStyleDVisible:ko.observable(false),
	checkVisible:ko.observable(false),
	nextVisible:ko.observable(false),
};

viewModel.stackChoice.subscribe(function (value){
	switch(value) {
		case 'Tamariz': stack = tamarizStack;
		break;
		case 'Aronson': stack = aronsonStack;
		break;
		case 'Aragon': stack = aragonStack;
		break;
	}
});


// fisher-yates shuffle from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


var stack;
var tamarizStack = [null, ['4', 'Clubs'], ['2', 'Hearts'], ['7', 'Diamonds'], ['3', 'Clubs'], ['4', 'Hearts'], ['6', 'Diamonds'], ['Ace', 'Spades'], ['5', 'Hearts'], ['9', 'Spades'], ['2', 'Spades'], ['Queen', 'Hearts'], ['3', 'Diamonds'], ['Queen', 'Clubs'], ['8', 'Hearts'], ['6', 'Spades'], ['5', 'Spades'], ['9', 'Hearts'], ['King', 'Clubs'], ['2', 'Diamonds'], ['Jack', 'Hearts'], ['3', 'Spades'], ['8', 'Spades'], ['6', 'Hearts'], ['10', 'Clubs'], ['5', 'Diamonds'], ['King', 'Diamonds'], ['2', 'Clubs'], ['3', 'Hearts'], ['8', 'Diamonds'], ['5', 'Clubs'], ['King', 'Spades'], ['Jack', 'Diamonds'], ['8', 'Clubs'], ['10', 'Spades'], ['King', 'Hearts'], ['Jack', 'Clubs'], ['7', 'Spades'], ['10', 'Hearts'], ['Ace', 'Diamonds'], ['4', 'Spades'], ['7', 'Hearts'], ['4', 'Diamonds'], ['Ace', 'Clubs'], ['9', 'Clubs'], ['Jack', 'Spades'], ['Queen', 'Diamonds'], ['7', 'Clubs'], ['Queen', 'Spades'], ['10', 'Diamonds'], ['6', 'Clubs'], ['Ace', 'Hearts'], ['9', 'Diamonds']];
var aronsonStack = []; // todo
var aragonStack = []; // todo

var createNewStack = function(){
	// todo -- user created stack
}

// initialise scores array, with 52 arrays of [i, j, k]
// for each card:
// 		i represents number of attempts 
// 		j represents the number of those that were correct (j <= i)
// 		k denotes if last 3 / 5 / 10 were in correct in a row (k <= j)
// (so that if we get a card wrong a bunch of times but then get it 3 (or 5 or 10) times correct in a row, we can move on)
viewModel.scores.push(null);
for (var i = 1; i<53; i++){
	viewModel.scores.push([0,0,0]);
}

function begin(){
	saveDataToLocalStorage()
	viewModel.welcomeVisible(false);
	viewModel.appVisible(true);
	newQuestion();
	$('#reset-button').prop("disabled", false); // there needs to be a better way to do this -- remove disabled attribute but then also save as variable
}


// styles of question:
// a what number is the 4C?
// b what card is at position 1?
// c what comes before the 4C?
// d what comes after the 4C


function newQuestion(){
	// debug: check what's left in question bank
	console.log("bank:"+viewModel.currentBank());

	// remove stylings
	$('.correct').removeClass('correct');
	$('.wrong').removeClass('wrong');
	$('.disabled').removeClass('disabled');
	$('.selected').removeClass('selected');

	// reset current and user values
	viewModel.currentCardPosition(null);
	viewModel.currentCardValue(null);
	viewModel.currentCardSuit(null);
	viewModel.userCardSuit(null);
	viewModel.userCardValue(null);
	viewModel.userCardPosition(null);
	viewModel.currentCorrect(false);

	// reset question styles visible
	viewModel.questionStyleAVisible(false);
	viewModel.questionStyleBVisible(false);	
	viewModel.questionStyleCVisible(false);
	viewModel.questionStyleDVisible(false);


	// take card from bank
	var x = viewModel.currentBank.shift();

	// set position, value and suit of this card
	viewModel.currentCardPosition(x);
	viewModel.currentCardValue(stack[x][0]);
	viewModel.currentCardSuit(stack[x][1]);

	// choose what type of question to use:
	viewModel.randomSeed((Math.floor((Math.random() * 4) + 1)));
	// viewModel.randomSeed(3);
	// make that question visible
	switch (viewModel.randomSeed()) {
		case 1: // user picks position of given card
			viewModel.questionStyleAVisible(true);
		break;
		case 2: // user picks card at given position 
			viewModel.questionStyleBVisible(true);	
		break;
		case 3: // user gives card before a given card
			viewModel.questionStyleCVisible(true);
		break;
		case 4: // user gives card that is after a given card
			viewModel.questionStyleDVisible(true);
		break;
	}

	// make the check button visible and the next button not
	viewModel.nextVisible(false);
	viewModel.checkVisible(true);
	saveDataToLocalStorage()
}

function check(){

	$('.positiondiv').addClass('disabled'); // disable all buttons
	$('.suitdiv').addClass('disabled');
	$('.valuediv').addClass('disabled');
	
	var x = viewModel.currentCardPosition();

	switch (viewModel.randomSeed()) {		
		case 1: // user picks position of given card
			if (viewModel.userCardPosition() === viewModel.currentCardPosition()) {
				viewModel.currentCorrect(true);
			}
		break;
		case 2: // user picks card at given position 
			if ((viewModel.userCardSuit() === viewModel.currentCardSuit()) && (viewModel.userCardValue() === viewModel.currentCardValue())) {
				viewModel.currentCorrect(true);
			}
		break;
		case 3: // user gives card before a given card
			if (viewModel.currentCardPosition() === 1){
				if ((viewModel.userCardSuit() === stack[52][1]) && (viewModel.userCardValue() === stack[52][0])){
					viewModel.currentCorrect(true);
				}
			} else if ((viewModel.userCardSuit() === stack[viewModel.currentCardPosition() - 1][1]) && (viewModel.userCardValue() === stack[viewModel.currentCardPosition() - 1][0])){
				viewModel.currentCorrect(true);
			}
		break;
		case 4: // user gives card that is after a given card
			if (viewModel.currentCardPosition() === 52){
				if ((viewModel.userCardSuit() === stack[1][1]) && (viewModel.userCardValue() === stack[1][0])){
					viewModel.currentCorrect(true);
				}
			} else if ((viewModel.userCardSuit() === stack[viewModel.currentCardPosition() + 1][1]) && (viewModel.userCardValue() === stack[viewModel.currentCardPosition() + 1][0])){
				viewModel.currentCorrect(true);
			}
		break;
		break;
	}

	
	// update scores array
	viewModel.scores()[x][0]++; // increase attempts by 1
	if (viewModel.currentCorrect()) { // if correct add correct answers by 1 and streak of corrects
		// console.log("correct");
		viewModel.scores()[x][1]++;
		viewModel.scores()[x][2]++;
		$('.selected').addClass('correct');

	} else { // else reset streak of corrects
		// console.log("wrong");
		viewModel.scores()[x][2] = 0;
		// show green on correct and red on the selected
		$('.selected').addClass('wrong');
		 
		// same for value and suit
	}

	// update colours: 
	var perecentageCorrect = viewModel.scores()[x][1] / viewModel.scores()[x][0];
	var rgbred = Math.round((1 - perecentageCorrect) * 255);
	var rgbgreen = Math.round((perecentageCorrect * 205) + 50);
	$('#score'+x).css({
		"background-color": "rgb("+rgbred+", "+rgbgreen+", 50)"
	})


	shuffle(viewModel.currentBank());
	// todo check bank being updated
	if (viewModel.scores()[x][2]>5) { // if streak > 5
		// add new card (number) to bank and don't re add current card
	} else { // else readd
		viewModel.currentBank.push(x);
	}
	// if scores[x][2] > 5 then {
		// dont readd card to bank and instead the next one along that has scores[x][0] === 0 (i.e. has no attempts)
	// } else {
	// put back in bank at other end i.e. so that when we pop we pick a new card
	// }
	// if bank empty add in first five again

	// make the check button not visible and the check button visible
	viewModel.checkVisible(false);
	viewModel.nextVisible(true);
	saveDataToLocalStorage()
}



function saveDataToLocalStorage() {
    var jsonData = ko.toJSON(viewModel);
    localStorage.setItem('StackTrainerData', jsonData);
}

// Load observables
function loadDataFromLocalStorage() {
    if (localStorage && localStorage.getItem('StackTrainerData')) {
        var savedData = localStorage.getItem('StackTrainerData');
        var parsedData = JSON.parse(savedData);
        viewModel.stackChoice(parsedData.stackChoice);
		viewModel.currentCardPosition(parsedData.currentCardPosition);
		viewModel.currentCardValue(parsedData.currentCardValue);
		viewModel.currentCardSuit(parsedData.currentCardSuit);
		viewModel.currentCorrect(parsedData.currentCorrect);
		viewModel.userCardPosition(parsedData.userCardPosition);
		viewModel.userCardValue(parsedData.userCardValue);
		viewModel.userCardSuit(parsedData.userCardSuit);
		viewModel.currentBank(parsedData.currentBank);
		viewModel.randomSeed(parsedData.randomSeed);
		viewModel.scores(parsedData.scores);
		viewModel.welcomeVisible(parsedData.welcomeVisible);
		viewModel.appVisible(parsedData.appVisible);
		viewModel.questionStyleAVisible(parsedData.questionStyleAVisible);
		viewModel.questionStyleBVisible(parsedData.questionStyleBVisible);
		viewModel.questionStyleCVisible(parsedData.questionStyleCVisible);
		viewModel.questionStyleDVisible(parsedData.questionStyleDVisible);
		viewModel.checkVisible(parsedData.checkVisible);
		viewModel.nextVisible(parsedData.nextVisible);
        // viewModel.UserName(parsedData.UserName);
    	$('#reset-button').prop("disabled", false); 
    }
}

function wipeLocalStorage() {
    if (confirm('Are you sure you want to reset the Stack Trainer? All progress will be lost.')) {
        localStorage.clear()
        location.reload()
    }
}