var viewModel = {
	stackChoice: ko.observable(),
	currentCardPosition: ko.observable(),
	currentCardValue: ko.observable(),
	currentCardSuit: ko.observable(),
	userCardPosition: ko.observable(),
	userCardValue: ko.observable(),
	userCardSuit: ko.observable(),
	currentBank: ko.observableArray([1, 2, 3, 4, 5, 6, 7]),
	currentCorrect: ko.observable(),
	randomSeed:ko.observable(),

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

var stack;
var tamarizStack = [null, [4, 'Clubs'], [2, 'Hearts'], [7, 'Diamonds'], [3, 'Clubs'], [4, 'Hearts'], [6, 'Diamonds'], ['A', 'Spades'], [5, 'Hearts'], [9, 'Spades'], [2, 'Spades'], ['Q', 'Hearts'], [3, 'Diamonds'], ['Q', 'Clubs'], [8, 'Hearts'], [6, 'Spades'], [5, 'Spades'], [9, 'Hearts'], ['K', 'Clubs'], [2, 'Diamonds'], ['J', 'Hearts'], [3, 'Spades'], [8, 'Spades'], [6, 'Hearts'], [10, 'Clubs'], [5, 'Diamonds'], ['K', 'Diamonds'], [2, 'Clubs'], [3, 'Hearts'], [8, 'Diamonds'], [5, 'Clubs'], ['K', 'Spades'], ['J', 'Diamonds'], [8, 'Clubs'], [10, 'Spades'], ['K', 'Hearts'], ['J', 'Clubs'], [7, 'Spades'], [10, 'Hearts'], ['A', 'Diamonds'], [4, 'Spades'], [7, 'Hearts'], [4, 'Diamonds'], ['A', 'Clubs'], [9, 'Clubs'], ['J', 'Spades'], ['Q', 'Diamonds'], [7, 'Clubs'], ['Q', 'Spades'], [10, 'Diamonds'], [6, 'Clubs'], ['A', 'Hearts'], [9, 'Diamonds']];
var aronsonStack = []; // todo
var aragonStack = []; // todo

var createNewStack = function(){
	// todo -- user created stack
}

// initialise scores array, with 52 [i, j, k]
// i represents number of attempts 
// j represents the number of those that were correct (j <= i)
// k denotes if last 3 / 5 / 10 were in correct in a row (k <= j)
// (so that if we get a card wrong a bunch of times but then get it 3 (or 5 or 10) times correct in a row, we can move on)
var scores = [];
scores.push(null);
for (var i = 1; i<53; i++){
	scores.push([0,0,0]);
}

var begin = function(){
	viewModel.welcomeVisible(false);
	viewModel.appVisible(true);
	newQuestion();
}


// styles of question:
// a what number is the 4C?
// b what card is at position 1?
// c what comes before the 4C?
// d what comes after the 4C


var newQuestion = function(){
	console.log("bank:"+viewModel.currentBank());
	// todo: remove all selected correct wrong classes
	// reset current 
	viewModel.userCardSuit(null);
	viewModel.userCardValue(null);
	viewModel.userCardPosition(null);
	viewModel.currentCorrect(false);
	// take card from from of array
	if (viewModel.currentBank().length > 0) {
		var x = viewModel.currentBank.shift();
		viewModel.currentCardPosition(x);
		viewModel.currentCardValue(stack[x][0]);
		viewModel.currentCardSuit(stack[x][1]);
		// do the question and add scores
		viewModel.randomSeed = Math.floor((Math.random() * 10) + 1);
		viewModel.randomSeed = 1; // for debug
		switch (viewModel.randomSeed) {
			case 1: // user picks position of given card
				viewModel.questionStyleAVisible(true);

			break;
			case 2: // user picks card at given position 
				viewModel.questionStyleBVisible(true);		
			break;
			case 3: // user gives card before a given card
			break;
			case 4: // user gives card that is after a given card
			break;
		}
		viewModel.nextVisible(false);
		viewModel.checkVisible(true);
	}
}

var check = function(){

	$('.positiondiv').prop('disabled', true); // disable all buttons

	switch (viewModel.randomSeed) {		
		case 1: // user picks position of given card
			if (viewModel.userCardPosition === viewModel.currentCardPosition) {
				viewModel.currentCorrect(true);
			}
		break;
		case 2: // user picks card at given position 
		break;
		case 3: // user gives card before a given card
		break;
		case 4: // user gives card that is after a given card
		break;
	}

	var x = viewModel.currentCardPosition();
	// scorekeeping:
	scores[x][0]++; // increase attempts by 1
	if (viewModel.currentCorrect()) { // if correct add correct answers by 1 and streak of corrects
		console.log("correct");
		scores[x][1]++;
		scores[x][2]++;
		$('.selected').addClass('correct');

	} else { // else reset streak of corrects
		console.log("wrong");
		scores[x][2] = 0;
		// show green on correct and red on the selected
		$('.selected').addClass('wrong');

	}

	// todo check bank being updated
	if (scores[x][2]>5) { // if streak > 5
		// add new card (number) to bank and don't re add current card
	} else { // else readd
		viewModel.currentBank.push(x);
	}
	// if scores[x][2] > 5 then {
		// dont readd card to bank and instead the next one along that has scores[x][0] === 0 (i.e. has no attempts)
	// } else {
	// put back in bank at other end i.e. so that when we pop we pick a new card
	// }
	// if 
	viewModel.checkVisible(false);
	viewModel.nextVisible(true);
}


// below is obsolete 

var newCorrectAnswer = function(number) {
	for (var i = 0; i<3; i++){
		scores[number][i] +=1	
	}
};

var newWrongAnswer = function(number) {
	scores[number][1] +=1;
	scores[number][2] = 0;
};
