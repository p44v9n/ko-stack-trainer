# ko-stack-trainer

A super simple, super lightweight, cross-device memory game for memorising a specific order ('stack') of deck of cards. Runs client-side in the browser and state is saved on the localstorage object. Uses the JavaScript framework Knockout.js (which in turn uses jquery).

## Bugs
- (Minor) fouc on load
- (Minor) ~the 'cheat sheet' is hardcoded, would be better to generate from selected stack~ use symbols on cheat sheet for suits

## Features to add
- Minimal progress bar
- Difficulty settings
  - level ideas:
	  - level 1: multiple choice from current bank
	  - level 2: full range of answers
	  - level 3: add in before/after questions at random
	  - level 4: 20s timer
	  - level 5: 10s timer
  - Optional timer setting on start page: user can set time in seconds (5s - 45s). If time runs out before an answer submitted has same effect as the 'dontknow' button.
  - If timer not turned on, turn on after completing the stack once, and each subsequent time decrease second by 1s to the min 5s.
- Adding a custom user defined stack (CSV comma delimited)
- On desktop/laptops, keyboard entry 
- On mobile, entering position using 0-9 instead of 1-52 
- Save and load
  - A way to transfer state between browsers.
  - Prob doable by hashing(?) the localstorage object and spitting out a string which the user copies and pastes.
  - Would be better to have a two way sync but not sure how do without a backend.
  - Some sort of string in the URL...?
