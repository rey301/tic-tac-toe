// game controller module that controls all features of tic tac toe;
const gameController = (function() {
	const grid = document.getElementById('board');
	let gameBoard = newGameBoard();
	let gridStr = '';
	let playerSymbol;


	function newGameBoard() {
		let gameBoard = new Array();

		for (let i=0; i < 9; i++) {
			gameBoard[i] = '';
		}

		// reset dom gameboard
		var symbols = document.getElementsByClassName('symbol');
		while (symbols.length > 0) {
			symbols[0].parentNode.removeChild(symbols[0]);
		}

		return gameBoard;
	}

	function displaySymbol(tileNum, tile) {
		var symbol = document.createElement('img');

		if (gameBoard[tileNum] == 'o') {
			symbol.setAttribute('src', 'svgs/circle.svg');
			symbol.className = 'symbol circle';
		} else if (gameBoard[tileNum] == 'x') {
			symbol.setAttribute('src', 'svgs/cross.svg');
			symbol.className = 'symbol cross';
		}

		tile.appendChild(symbol);
	}

	function displayBoard() {
		for (const tile of grid.children) {
			let tileNum = tile.classList[1];
			// run again to make sure it displays the comp's symbol
			displaySymbol(tileNum, tile); 
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
		
		// Choose player's symbol
		let input = prompt('X or O?');
		playerSymbol = input.toLowerCase();

		// Choose computer's symbol
		let compSymbol;
		playerSymbol == 'x' ? compSymbol = 'o' : compSymbol = 'x';

		// Listener to store player symbol on a tile
		function tileClickListener(event) {
			let tile = event.currentTarget;
			let tileNum = tile.classList[1];
			if (gameBoard[tileNum] == '') {
				playerRound(tileNum);
			}

			displaySymbol(tileNum, tile); // Display symbol after clicking
			setTimeout(()=> compRound(compSymbol), 250);
		}

		// WeakMap to store event listeners
		const listenersMap = new WeakMap();

	// Loop through each tile in the grid
	for (const tile of grid.children) {
		// Remove any existing event listener by cloning the node
    	const newtile = tile.cloneNode(true);
    	tile.replaceWith(newtile);

    	// Add the new event listener
    	newtile.addEventListener('click', tileClickListener);
	}

		console.log('Game Start!');
		setTimeout(() => compRound(compSymbol), 500);
	}

	return {
		playGame,
	};
})();

const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => gameController.playGame());
