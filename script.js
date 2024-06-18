// Module that controls all features of tic tac toe
const gameController = (function() {
	const grid = document.getElementById('board');
	let gameBoard = initializeGameBoard();
	let playerSymbol;
	let compSymbol;

	// Initialize or reset the game board
	function initializeGameBoard() {
		const board = Array(9).fill('');
		const symbols = document.querySelectorAll('.symbol');
		symbols.forEach(symbol => symbol.remove());
		return board;
	}

	// Display the appropriate symbol on the tile
	function displaySymbol(tileNum, tile) {
		const symbol = document.createElement('img');
		if (gameBoard[tileNum] === 'o') {
			symbol.src = 'svgs/circle.svg';
			symbol.className = 'symbol circle';
		} else if (gameBoard[tileNum] === 'x') {
			symbol.src = 'svgs/cross.svg';
			symbol.className = 'symbol cross';
		}
		tile.appendChild(symbol);
	}

	// Display the entire board
	function displayBoard() {
		Array.from(grid.children).forEach((tile, index) => displaySymbol(index, 
			tile));
	}

	// Function to disable further clicks on tiles
	function disableTiles() {
		attachListener(tileClickMessageListener);
	}

	function checkWin() {
		const winCondArr = [
			[0,1,2],[3,4,5],[6,7,8],
			[0,3,6],[1,4,7],[2,5,8],
			[0,4,8],[6,4,2]
		];
		let tieFlag = true;

		// Loop through each array within the win conditions array
		for (const [index1, index2, index3] of winCondArr) {
			const [val1, val2, val3] = [gameBoard[index1], gameBoard[index2], 
				gameBoard[index3]];
			// Checking for winning conditions for 'x' and 'o';
			if (val1 && val1 === val2 && val1 === val3) {
				disableTiles();
				playBtn.textContent = 'New Game';
				setTimeout(() => window.alert(`${val1} wins!`), 100);	
				return true;
			};
			if (!val1 || !val2 || !val3) tieFlag = false;
		}
		
		if (tieFlag) {
			disableTiles();
			playBtn.textContent = 'New Game';
			setTimeout(() => window.alert("It's a tie!"), 100);
			return true;
		}
		
		return false;
	}

	// Execute computer's move
	function compRound(symbol) {
		if (!checkWin()) {
			// Get all indices of empty spots
			const emptySpots = gameBoard.map((val, index) => val === '' ? index : null).filter(index => index !== null);
			if (emptySpots.length > 0) {
				// Pick a random index from the empty spots
				const randomNum = emptySpots[Math.floor(Math.random() * emptySpots.length)];
				gameBoard[randomNum] = symbol;
			}
			displayBoard();
			checkWin();
		}
		return gameBoard;
	};
	
	// Execute player's move
	function playerRound(tileNum) {
		if (!checkWin()) {
			gameBoard[tileNum] = playerSymbol;
			displayBoard();
		}
		return gameBoard;
	};

	// Event listener for tile clicks
	function tileClickListener(event) {
		const tile = event.currentTarget;
		const tileNum = tile.classList[1];
		if (gameBoard[tileNum] == '') {
			playerRound(tileNum);
			setTimeout(() => compRound(compSymbol), 100);
		}
	}

	// Event listener for error message pop ups after clicking tiles
	function tileClickMessageListener(event) {
		window.alert('Game has ended! Please restart the game.');
	}
	
	// Attach event listeners to tiles
	function attachListener(listener) {
		for (const tile of grid.children) {
			// Replace any existing event listener by cloning the node
    		const newTile = tile.cloneNode(true);
    		tile.replaceWith(newTile);
    		newTile.addEventListener('click', listener);
		}
	}

	function playGame() {
		playBtn.textContent = 'Restart Game';
		gameBoard = initializeGameBoard();
		playerSymbol = prompt('X or O?').toLowerCase();
		compSymbol = playerSymbol == 'x' ? 'o' : 'x';
		
		attachListener(tileClickListener);

		console.log('Game Start!');
		setTimeout(() => compRound(compSymbol), 100);
	}

	return { playGame };
})();

const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => gameController.playGame());

