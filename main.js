"use strict";

/*
 * A game.
 * Author: Andrew Kostka (apkostka.com)
 */

(function(window, document, undefned){

	function Game() {

		this.generate = function(){
			var self = this;

			var code = [];
			
			for (var i = 1; i < 5; i++) {
				code.push(Math.floor(Math.random() * 4) + 1);
			}

			return code;
		};
		
		var tries = 20;

		this.getTries = function(){
			return tries;
		};

		this.decrementTries = function(){
			tries--;
		};

		var code = this.generate();

		this.guess = function(guess){
			var self = this;

			if (typeof guess !== "object" || guess.length !== 4) return "Your guess was not a 4-digit array!";
			if (this.getTries() == 0) {
				code = self.generate();
				tries = 10;
				return "You're out of tries! The code has been reset.";			
			}

			var num = 0;
		        var place = 0;

			var copy = [];
			for (var y in code){
				copy.push(code[y]);
			}
			for (var x in guess) {
				if (copy.indexOf(guess[x]) >= 0) {
					copy.splice(copy.indexOf(guess[x]), 1);
					num++;
				}
			}

			for (var x in guess) {
				if (guess[x] == code[x]) place++;
			}

			if (place == 4) {
				console.log("You've won! The code was " + code);
				console.log("Feel free to play again!");
				code = self.generate();
				return;
			} else {
				console.log("Numbers right: " + num);
				console.log("Places right: " + place);
				self.decrementTries();
				console.log("Tries left: " + self.getTries());
				return;
			}
		};
	};

	var game = new Game();
	window.game = game;

})(window,document);