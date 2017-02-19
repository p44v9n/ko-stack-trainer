var stack;
var tamarizStack = [null, [4,c], [2,h], [7,d], ];
var aronsonStack = [];

// initialise scores array, with 52 [0,0,0]
// represents fraction of attempts that are correct and if last 3 / 5 / 10 were correct
// i.e. if we get a card wrong a bunch of times but then get it 3 (or 5 or 10) times correct in a row, we 
var scores [null];
for (var i = 0; i<53; i++){
	scores.push([0,0;])
}

var setStack = function(which) {
	switch(which) {
		case tamariz: stack = tamarizStack;
		break;
		case aronson: stack = aronsonStack;
		break;
	}
}

var newCorrect = function(number) {
	for (var i = 0; i<3; i++){
		scores[number][i] +=1	
	}
};

var newWrong = function(number) {
	scores[number][1] +=1;
	scores[number][2] = 0;
};
