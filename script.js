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
					return 'x';
			} else if (gameBoard[index1] == 'o' && gameBoard[index2] == 'o'
				&& gameBoard[index3] == 'o') {
					return 'o';
			} 
		}
	}

	// [0][1][2]
	// [3][4][5]
	// [6][7][8]

	// middle: 4
	// corners：[(0: [1, 2], [4, 8], [3, 6]), 
	//			 (2: [0, 1], [5, 8], [4, 6]),
	//		     (6: [0, 3], [7, 8], [4, 2])
	// 			 (8: [0, 4], [2, 4 ], [7, 6])
	// sides: [1, 3, 5, 7]

	// 

	function compRound() {
		let randomNum = Math.floor(Math.random() * 8);
		while (gameBoard[randomNum] !== ' ') {
			randomNum = Math.floor(Math.random() * 9);
		}

		gameBoard[randomNum] = 'x';

		updateGridStr();
		console.log(gridStr);

		let win = checkWin();

		if (win) {
			console.log(`${win} wins`);
		}

		return gameBoard;
	};

	function playerRound(pos) {
		gameBoard[pos] = 'x'; 
		updateGridStr();
		console.log(gridStr);

		let win = checkWin();

		if (win) {
			console.log(`${win} wins`);
		}

		return gameBoard;
	};

	return {
		compRound,
		playerRound,
		updateGridStr,
	};
})();

console.log(gameController.updateGridStr());