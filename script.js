const gameController = (function() {
	const gameBoard = (function() {
		let gameBoard = new Array();
		for (let i=0; i < 9; i++) {
			gameBoard[i] = ' ';
		}
		return gameBoard;
	}());

	let gridStr = '';

	function updateGridStr() {
		gridStr = '';
		for (let i = 0; i < 9; i++) {
			gridStr = gridStr.concat('|', gameBoard[i], '|');
			if (i == 2 || i == 5){
				gridStr = gridStr.concat('\n');
			}
		}
		return gridStr;
	};

	function compRound() {
		let randomNum = Math.floor(Math.random() * 8);
		while (gameBoard[randomNum] !== ' ') {
			randomNum = Math.floor(Math.random() * 9);
		}

		gameBoard[randomNum] = 'x';

		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};

	function playerRound(pos) {
		gameBoard[pos] = 'o'; 
		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};

	return {
		compRound,
		playerRound,
		updateGridStr,
	};
})();

console.log(gameController.updateGridStr());