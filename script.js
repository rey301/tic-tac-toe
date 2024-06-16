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
	


	function checkWin() {
		const winCondArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
		for (let i = 0; i < 8; i++) {
			let index1 = winCondArr[i][0];
			let index2 = winCondArr[i][1];
			let index3 = winCondArr[i][2];

			if (gameBoard[index1] == 'x' && gameBoard[index2] == 'x'
				&& gameBoard[index3] == 'x') {
					return 'x wins';
			} else if (gameBoard[index1] == 'o' && gameBoard[index2] == 'o'
				&& gameBoard[index3] == 'o') {
					return 'o wins';
			} 
		}

		return false;
	}

	function compRound(symbol) {
		let randomNum = Math.floor(Math.random() * 8);
		while (gameBoard[randomNum] !== ' ') {
			randomNum = Math.floor(Math.random() * 9);
		}

		gameBoard[randomNum] = symbol;

		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};
	
	function playerRound(pos) {
		gameBoard[pos] = 'x'; 
		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};

	function playGame() {
		let input = prompt('X or O?');
		let playerSymbol = input.toLowerCase();
		let compSymbol;
		playerSymbol == 'x' ? compSymbol = 'o' : compSymbol = 'x';

		console.log('Game Start!');

		while (!checkWin()) {
			compRound(compSymbol);
			let posInput = prompt('Which position?');
			playerRound(posInput);
		}

		return checkWin();
	}

	return {
		compRound,
		playerRound,
		updateGridStr,
		playGame,
	};
})();

console.log(gameController.updateGridStr());