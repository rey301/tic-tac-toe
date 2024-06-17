// game controller module that controls all features of tic tac toe;
const gameController = (function() {
	const grid = document.getElementById('board');

	let gameBoard = newGameBoard();
	let gridStr = '';
	let playerSymbol;
	let playerRoundEnd = true;

	function newGameBoard() {
		let gameBoard = new Array();
		for (let i=0; i < 9; i++) {
			gameBoard[i] = '';
		}
		return gameBoard;
	}

	function displaySymbol(blockNum, block) {
		var symbol = document.createElement('img');

			if (gameBoard[blockNum] == 'o') {
				symbol.setAttribute('src', 'svgs/circle-svgrepo-com.svg');
				symbol.className = 'circle';
			} else if (gameBoard[blockNum] == 'x') {
				symbol.setAttribute('src', 'svgs/cross-svgrepo-com.svg');
				symbol.className = 'cross';
			}
		
		block.appendChild(symbol);
	}

	function displayBoard() {
		for (const block of grid.children) {
			let blockNum = block.classList[1];
			// run again to make sure it displays the comp's symbol
			displaySymbol(blockNum, block); 
		}
	}

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
		const winCondArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
							[0,4,8],[6,4,2]];
		let tieFlag = true;
		for (let i = 0; i < 8; i++) {
			let index1 = winCondArr[i][0];
			let index2 = winCondArr[i][1];
			let index3 = winCondArr[i][2];

			// check if any spaces are empty
			if (gameBoard[i] == '') {
				tieFlag = false;
			}

			if (gameBoard[index1] == 'x' && gameBoard[index2] == 'x'
					&& gameBoard[index3] == 'x') {
				return 'x wins';
			} else if (gameBoard[index1] == 'o' && gameBoard[index2] == 'o'
					&& gameBoard[index3] == 'o') {
				return 'o wins';
			}
		}
		
		if (tieFlag) {
			return "It's a tie!";
		} else {
			return false;
		}
	}

	function compRound(symbol) {
		if (!checkWin()) {
			let randomNum = Math.floor(Math.random() * 9);
			while (gameBoard[randomNum] !== '') {
				randomNum = Math.floor(Math.random() * 9);
			}

			gameBoard[randomNum] = symbol;

			// updateGridStr();
			// console.log(gridStr);

			displayBoard();
		}

		return gameBoard;
	};
	
	function playerRound(pos) {
		gameBoard[pos] = playerSymbol; 
		// updateGridStr();
		// console.log(gridStr);

		displayBoard();
		return gameBoard;
	};

	function playGame() {
		gameBoard = newGameBoard();
		let input = prompt('X or O?');
		playerSymbol = input.toLowerCase();
		let compSymbol;
		playerSymbol == 'x' ? compSymbol = 'o' : compSymbol = 'x';

		for (const block of grid.children) {
			let blockNum = block.classList[1];
			block.addEventListener('click', () => {
				if (gameBoard[blockNum] == '') {
					playerRound(blockNum);
				}
				// display the symbol upon clicking
				displaySymbol(blockNum, block);
				compRound(compSymbol);
			});
		}

		compRound(compSymbol);
		console.log('Game Start!');

		
	}

	return {
		playGame,
	};
})();

const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => gameController.playGame());
