var viewModel = {
	stackChoice: ko.observable(),

	// actual values
	currentCardPosition: ko.observable(),
	currentCardValue: ko.observable(),
	currentCardSuit: ko.observable(),
	currentAnswerAsText: ko.observable(),
	// user values
	currentCorrect: ko.observable(),
	userCardPosition: ko.observable(null),
	userCardValue: ko.observable(null),
	userCardSuit: ko.observable(null),
	
	// other things we use
	currentBank: ko.observableArray([1, 2, 3, 4, 5, 6, 7]),
	untested: ko.observableArray([8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]),
	randomSeed:ko.observable(),
	scores: ko.observableArray(),
	// totalAttempts:ko.computed(), TODO  - computed observable?
	// totalCorrect:ko.computed(), TODO

	// visibility
	welcomeVisible: ko.observable(true),
	resourcesVisible:ko.observable(false),
	cheatVisible:ko.observable(false),
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
		case 'Aragón': stack = aragonStack;
		break;
		case 'Aronson': stack = aronsonStack;
		break;
		case 'Redford': stack = redfordStack;
		break;
		case 'nikolaStack': stack = nikolaStack;
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


var tamarizStack = [null, ['4', 'Clubs'], ['2', 'Hearts'], ['7', 'Diamonds'], ['3', 'Clubs'], ['4', 'Hearts'], ['6', 'Diamonds'], ['Ace', 'Spades'], ['5', 'Hearts'], ['9', 'Spades'], ['2', 'Spades'], ['Queen', 'Hearts'], ['3', 'Diamonds'], ['Queen', 'Clubs'], ['8', 'Hearts'], ['6', 'Spades'], ['5', 'Spades'], ['9', 'Hearts'], ['King', 'Clubs'], ['2', 'Diamonds'], ['Jack', 'Hearts'], ['3', 'Spades'], ['8', 'Spades'], ['6', 'Hearts'], ['10', 'Clubs'], ['5', 'Diamonds'], ['King', 'Diamonds'], ['2', 'Clubs'], ['3', 'Hearts'], ['8', 'Diamonds'], ['5', 'Clubs'], ['King', 'Spades'], ['Jack', 'Diamonds'], ['8', 'Clubs'], ['10', 'Spades'], ['King', 'Hearts'], ['Jack', 'Clubs'], ['7', 'Spades'], ['10', 'Hearts'], ['Ace', 'Diamonds'], ['4', 'Spades'], ['7', 'Hearts'], ['4', 'Diamonds'], ['Ace', 'Clubs'], ['9', 'Clubs'], ['Jack', 'Spades'], ['Queen', 'Diamonds'], ['7', 'Clubs'], ['Queen', 'Spades'], ['10', 'Diamonds'], ['6', 'Clubs'], ['Ace', 'Hearts'], ['9', 'Diamonds']];
var aronsonStack = [null, ['Jack', 'Spades'], ['King', 'Clubs'], ['5', 'Clubs'], ['2', 'Hearts'], ['9', 'Spades'], ['Ace', 'Spades'], ['3', 'Hearts'], ['6', 'Clubs'], ['8', 'Diamonds'], ['Ace', 'Clubs'], ['10', 'Spades'], ['5', 'Hearts'], ['2', 'Diamonds'], ['King', 'Diamonds'], ['7', 'Diamonds'], ['8', 'Clubs'], ['3', 'Spades'], ['Ace', 'Diamonds'], ['7', 'Spades'], ['5', 'Spades'], ['Queen', 'Diamonds'], ['Ace', 'Hearts'], ['8', 'Spades'], ['3', 'Diamonds'], ['7', 'Hearts'], ['Queen', 'Hearts'], ['5', 'Diamonds'], ['7', 'Clubs'], ['4', 'Hearts'], ['King', 'Hearts'], ['4', 'Diamonds'], ['10', 'Diamonds'], ['Jack', 'Clubs'], ['Jack', 'Hearts'], ['10', 'Clubs'], ['Jack', 'Diamonds'], ['4', 'Spades'], ['10', 'Hearts'], ['6', 'Hearts'], ['3', 'Clubs'], ['2', 'Spades'], ['9', 'Hearts'], ['King', 'Spades'], ['6', 'Spades'], ['4', 'Clubs'], ['8', 'Hearts'], ['9', 'Clubs'], ['Queen', 'Spades'], ['6', 'Diamonds'], ['Queen', 'Clubs'], ['2', 'Clubs'], ['9', 'Diamonds']];
var redfordStack = [null, ['Queen', 'Hearts'], ['2', 'Spades'], ['5', 'Diamonds'], ['8', 'Clubs'], ['Jack', 'Hearts'], ['King', 'Spades'], ['10', 'Hearts'], ['7', 'Clubs'], ['4', 'Diamonds'], ['Ace', 'Spades'], ['8', 'Hearts'], ['5', 'Clubs'], ['2', 'Diamonds'], ['Queen', 'Spades'], ['9', 'Hearts'], ['6', 'Clubs'], ['3', 'Diamonds'], ['10', 'Spades'], ['7', 'Hearts'], ['4', 'Clubs'], ['Ace', 'Diamonds'], ['Jack', 'Spades'], ['9', 'Spades'], ['6', 'Hearts'], ['3', 'Clubs'], ['King', 'Diamonds'], ['Queen', 'Diamonds'], ['10', 'Diamonds'], ['7', 'Spades'], ['4', 'Hearts'], ['Ace', 'Clubs'], ['Jack', 'Diamonds'], ['8', 'Spades'], ['5', 'Hearts'], ['2', 'Clubs'], ['2', 'Hearts'], ['Queen', 'Clubs'], ['9', 'Diamonds'], ['6', 'Spades'], ['3', 'Hearts'], ['King', 'Clubs'], ['4', 'Spades'], ['Ace', 'Hearts'], ['Jack', 'Clubs'], ['8', 'Diamonds'], ['5', 'Spades'], ['3', 'Spades'], ['King', 'Hearts'], ['10', 'Clubs'], ['7', 'Diamonds'], ['6', 'Diamonds'], ['9', 'Clubs']];
var aragonStack = [null, ['Jack', 'Spades'], ['7', 'Clubs'], ['10', 'Hearts'], ['Ace', 'Diamonds'], ['4', 'Clubs'], ['7', 'Hearts'], ['4', 'Diamonds'], ['Ace', 'Spades'], ['4', 'Hearts'], ['7', 'Diamonds'], ['4', 'Spades'], ['Ace', 'Hearts'], ['10', 'Diamonds'], ['7', 'Spades'], ['Jack', 'Clubs'], ['King', 'Diamonds'], ['10', 'Spades'], ['8', 'Clubs'], ['Jack', 'Hearts'], ['Ace', 'Clubs'], ['King', 'Spades'], ['5', 'Clubs'], ['8', 'Hearts'], ['3', 'Diamonds'], ['Queen', 'Spades'], ['King', 'Hearts'], ['9', 'Clubs'], ['Queen', 'Hearts'], ['6', 'Clubs'], ['9', 'Hearts'], ['2', 'Diamonds'], ['3', 'Clubs'], ['6', 'Hearts'], ['5', 'Diamonds'], ['2', 'Spades'], ['3', 'Hearts'], ['8', 'Diamonds'], ['5', 'Spades'], ['King', 'Clubs'], ['Jack', 'Diamonds'], ['8', 'Spades'], ['10', 'Clubs'], ['2', 'Clubs'], ['5', 'Hearts'], ['6', 'Diamonds'], ['3', 'Spades'], ['2', 'Hearts'], ['9', 'Diamonds'], ['6', 'Spades'], ['Queen', 'Clubs'], ['Queen', 'Diamonds'], ['9', 'Spades']];
var nikolaStack = [null, ['6', 'Diamonds'], ['5', 'Clubs'], ['King', 'Clubs'], ['Jack', 'Hearts'], ['5', 'Spades'], ['9', 'Diamonds'], ['9', 'Spades'], ['Queen', 'Hearts'], ['3', 'Clubs'], ['10', 'Clubs'], ['King', 'Spades'], ['Ace', 'Hearts'], ['4', 'Diamonds'], ['Jack', 'Diamonds'], ['King', 'Diamonds'], ['King', 'Hearts'], ['2', 'Diamonds'], ['Queen', 'Clubs'], ['9', 'Clubs'], ['10', 'Hearts'], ['8', 'Diamonds'], ['2', 'Clubs'], ['Ace', 'Clubs'], ['7', 'Hearts'], ['7', 'Clubs'], ['4', 'Spades'], ['7', 'Spades'], ['9', 'Hearts'], ['8', 'Spades'], ['6', 'Spades'], ['6', 'Clubs'], ['2', 'Hearts'], ['Ace', 'Spades'], ['Jack', 'Spades'], ['4', 'Clubs'], ['5', 'Hearts'], ['10', 'Spades'], ['Ace', 'Diamonds'], ['Jack', 'Clubs'], ['4', 'Hearts'], ['2', 'Spades'], ['7', 'Diamonds'], ['Queen', 'Spades'], ['3', 'Hearts'], ['3', 'Spades'], ['8', 'Clubs'], ['10', 'Diamonds'], ['6', 'Hearts'], ['5', 'Diamonds'], ['3', 'Diamonds'], ['Queen', 'Diamonds'], ['8', 'Hearts']];
var stack = tamarizStack;

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
	$('.menu').show(); // there needs to be a better way to do this -- remove disabled attribute but then also save as variable
}


// styles of question:
// a what number is the 4C?
// b what card is at position 1?
// c what comes before the 4C?
// d what comes after the 4C


function newQuestion(){
	// remove stylings
	$('.correct').removeClass('correct');
	$('.wrong').removeClass('wrong');
	$('.disabled').removeClass('disabled');
	$('.selected').removeClass('selected');

	// hide the correct answer box
	$('#dontknowbox').hide();
	viewModel.currentAnswerAsText('');

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
	var x = viewModel.currentBank()[0];

	// set position, value and suit of this card
	viewModel.currentCardPosition(x);
	viewModel.currentCardValue(stack[x][0]);
	viewModel.currentCardSuit(stack[x][1]);

	// choose what type of question to use:
	viewModel.randomSeed((Math.floor((Math.random() * 4) + 1)));
	// viewModel.randomSeed(1); // debug
	
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

function dontknow(){
	$('.positiondiv').addClass('disabled'); // disable all buttons
	$('.suitdiv').addClass('disabled');
	$('.valuediv').addClass('disabled');
	viewModel.currentCorrect(false);

	switch (viewModel.randomSeed()) {		
	case 1: // user picks position of given card
			viewModel.currentAnswerAsText('The '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+' is card '+viewModel.currentCardPosition()+'.');
	break;
	case 2: // user picks card at given position 
				viewModel.currentAnswerAsText('Card '+viewModel.currentCardPosition()+' is the '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+'.');
	break;
	case 3: // user gives card before a given card
		if (viewModel.currentCardPosition() === 1){
			viewModel.currentAnswerAsText('The '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+' is card '+viewModel.currentCardPosition()+', so the card before it is card 52, the '+stack[52][0]+' of '+stack[52][1]+'.');
		} else {
			viewModel.currentAnswerAsText('The '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+' is card '+viewModel.currentCardPosition()+', so the card before it is the '+stack[viewModel.currentCardPosition() - 1][0]+' of '+stack[viewModel.currentCardPosition() - 1][1]+'.');
		}
	break;
	case 4: // user gives card that is after a given card
		if (viewModel.currentCardPosition() === 52){
					viewModel.currentAnswerAsText('The '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+' is card '+viewModel.currentCardPosition()+', so the card after it is card 1, the '+stack[1][0]+' of '+stack[1][1]+'.');
		} else {
					viewModel.currentAnswerAsText('The '+viewModel.currentCardValue()+' of '+viewModel.currentCardSuit()+' is card '+viewModel.currentCardPosition()+', so the card after it is the '+stack[viewModel.currentCardPosition() + 1][0]+' of '+stack[viewModel.currentCardPosition() + 1][1]+'.');
		}
	break;
	}
	$('#dontknowbox').show();
	calcscores();
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
			} else {
				if ((viewModel.userCardSuit() === stack[viewModel.currentCardPosition() - 1][1]) && (viewModel.userCardValue() === stack[viewModel.currentCardPosition() - 1][0])){
					viewModel.currentCorrect(true);
				}
			}
		break;
		case 4: // user gives card that is after a given card
			if (viewModel.currentCardPosition() === 52){
				if ((viewModel.userCardSuit() === stack[1][1]) && (viewModel.userCardValue() === stack[1][0])){
					viewModel.currentCorrect(true);
				}
			} else {
				if ((viewModel.userCardSuit() === stack[viewModel.currentCardPosition() + 1][1]) && (viewModel.userCardValue() === stack[viewModel.currentCardPosition() + 1][0])){
					viewModel.currentCorrect(true);
				}

			}
		break;
		break;
	}

	calcscores();
}

function calcscores(){

	var x = viewModel.currentCardPosition();

	// update scores array
	viewModel.scores()[x][0]++; // increase attempts by 1
	if (viewModel.currentCorrect()) { // if correct add correct answers by 1 and streak of corrects
		// console.log("correct");
		viewModel.scores()[x][1]++; // increase overall correct by 1
		viewModel.scores()[x][2]++; // increase score streak by 1
		$('.selected').addClass('correct');
		$('#continue-button').removeClass('wrong-shadow');
		$('#continue-button').addClass('correct-shadow');

	} else { // else reset streak of corrects
		// console.log("wrong");
		viewModel.scores()[x][2] = 0; // reset score streak to 0
		// show red on the selected
		$('.selected').addClass('wrong');
		$('#continue-button').removeClass('correct-shadow');
		$('#continue-button').addClass('wrong-shadow');
	}

	// update colours: 
	var percentageCorrect = viewModel.scores()[x][1] / viewModel.scores()[x][0];
	var rgbred = Math.round((1 - percentageCorrect) * 255);
	var rgbgreen = Math.round((percentageCorrect * 205) + 50);
	$('#score'+x).css({
		"background-color": "rgb("+rgbred+", "+rgbgreen+", 50)"
	})

	// console.log("card "+x+": "+percentageCorrect);


	// update bank
	if ((percentageCorrect > 0.9) || viewModel.scores()[x][2]>3) { // if streak >= 4  or percentage > 90%
		viewModel.currentBank.shift();
		if (viewModel.untested() !== []){
			var bob = viewModel.untested.shift();
			viewModel.currentBank.push(bob);
		}
	} else { // else readd current card
	}

	// if bank empty add in first 7 again
	// TODO add a message, add a timer for next go around
	if (viewModel.currentBank() === []){
		viewModel.currentBank([1, 2, 3, 4, 5, 6, 7]);
	}
	if (viewModel.untested() === []){
		viewModel.untested([8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]);
	}

	// shuffle card bank
	shuffle(viewModel.currentBank());

	// if same card comes to the front move it to the back, to avoid getting a duplicate question
	// this is prob a silly way -- we should just re add back after
	if (viewModel.currentBank()[0] === viewModel.currentCardPosition()){
		var move = viewModel.currentBank.shift();
		viewModel.currentBank.push(move);
	}

	// debug: check what's left in question bank
	// console.log("bank:"+viewModel.currentBank());
	// console.log("untested: "+viewModel.untested());

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
		viewModel.untested(parsedData.untested);
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
    	$('.menu').show(); // there needs to be a better way to do this -- remove disabled attribute but then also save as variable
    	reloadColours();
    	newQuestion();
    }
}

function reloadColours() {
	for (var i=1; i<53; i++){
		var perecentageCorrect = viewModel.scores()[i][1] / viewModel.scores()[i][0];
		var rgbred = Math.round((1 - perecentageCorrect) * 255);
		var rgbgreen = Math.round((perecentageCorrect * 205) + 50);
		$('#score'+i).css({
			"background-color": "rgb("+rgbred+", "+rgbgreen+", 50)"
	})
	}
}

function wipeLocalStorage() {
    if (confirm('Are you sure you want to reset the Stack Trainer? All progress will be lost.')) {
        localStorage.clear()
        location.reload()
    }
}