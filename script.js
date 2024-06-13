const gameController = (function() {
	const gameBoard = (function() {
		let gameBoard = new Array();
		for (let i=0; i < 9; i++) {
			gameBoard[i] = ' ';
		}
		return gameBoard;
	}());
	let gridStr = '';

	for (let i = 1; i < 10; i++) {
		gridStr = gridStr.concat('|', gameBoard[i-1], '|');
		if (i % 3 == 0 && i !== 1){
			gridStr = gridStr.concat('\n');
		}
	}

	function createCompChoice() {
		if (Math.random() >= 0.5) {
			return 'x';
		} else {
			return 'o';
		}
	}

	function updateGridStr() {
		for (let i = 0; i < 9; i++) {
			gridStr = gridStr.concat('|', gameBoard[i], '|');
			if (i % 3 == 0 && i !== 0){
				gridStr = gridStr.concat('\n');
			}
		}
	}

	function playRound() {
		let choice = createCompChoice();
		let randomNum = Math.floor(Math.random(8));
		gameBoard[randomNum] = choice;
		updateGridStr();
	}

	return {
		gameBoard,
		createCompChoice,
		playRound,
		gridStr,
	};
})();

console.log(gameController.gridStr);