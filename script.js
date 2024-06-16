// game controller module that controls all features of tic tac toe;
const gameController = (function() {
	let gameBoard = newGameBoard();
	let gridStr = '';

	function newGameBoard() {
		let gameBoard = new Array();
		for (let i=0; i < 9; i++) {
			gameBoard[i] = 'x';
		}
		return gameBoard;
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
			if (gameBoard[i] == ' ') {
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
		let randomNum = Math.floor(Math.random() * 9);
		while (gameBoard[randomNum] !== ' ') {
			randomNum = Math.floor(Math.random() * 9);
		}

		gameBoard[randomNum] = symbol;

		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};
	
	function playerRound(pos, symbol) {
		gameBoard[pos] = symbol; 
		updateGridStr();
		console.log(gridStr);

		return gameBoard;
	};

	function playGame() {
		gameBoard = newGameBoard();
		let input = prompt('X or O?');
		let playerSymbol = input.toLowerCase();
		let compSymbol;
		playerSymbol == 'x' ? compSymbol = 'o' : compSymbol = 'x';

		console.log('Game Start!');
		console.log(gameController.updateGridStr());

		while(checkWin()) {
			compRound(compSymbol);
			if (checkWin()) {
				break;
			}
			posInput = prompt('Which position?');
			playerRound(posInput, playerSymbol);
		}

		return checkWin();
	}

	return {
		gameBoard,
		compRound,
		playerRound,
		updateGridStr,
		playGame,
	};
})();

const grid = document.getElementById('board');
let i = 0;
for (const block of grid.children) {
	let currSymbol = gameController.gameBoard[i];
	var symbol = document.createElement('img');

	if (Math.random() > 0.5) {
		symbol.setAttribute('src', 'svgs/circle-svgrepo-com.svg');
		symbol.className = 'circle';
	} else {
		symbol.setAttribute('src', 'svgs/cross-svgrepo-com.svg');
		symbol.className = 'cross';
	}
	
	block.appendChild(symbol);
	console.log(block.textContent);
	i++;
}
