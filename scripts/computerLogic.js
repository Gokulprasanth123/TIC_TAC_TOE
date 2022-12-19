/**
 * a function which has the logic of player vs computer easy logic
 *
 * @param {}
 * @return {}
 *
 */
function playerVsComputerEasy() {
  board = [];
  i = 0;
  [...ticTacTacGrid].forEach((grid) => {
    board.push(grid);
    grid.addEventListener("click", () => {
      if (grid.innerText === "") {
        movesArray[i++] = {
          index: grid.id.split("-")[1],
          value: value,
        };
        grid.innerText = value;
        winOrLose("computer");
        if (count !== 0 && count !== 9) {
          let aiMove = bestSpot(board);
          movesArray[i++] = {
            index: aiMove.id.split("-")[1],
            value: value,
          };
          aiMove.innerText = value;
          winOrLose("computer");
        }
      }
    });
  });
}

/**
 * a function which has the logic for player vs computer medium and hard
 *
 * @param {string} difficulty
 * @return {}
 */
function mediumOrDifficultGame(difficulty) {
  (i = 0), (board = []), (board1 = Array.from(Array(9).keys()));
  [...ticTacTacGrid].forEach((grid) => {
    board.push(grid);
    grid.addEventListener("click", () => {
      if (grid.innerText === "") {
        movesArray[i++] = {
          index: grid.id.split("-")[1],
          value: value,
        };
        grid.innerText = value;
        board1[Number(grid.id.split("-")[1])] = value;
        winOrLose("computer");
        if (count !== 0 && count !== 9) {
          let aiMove = bestSpot1(board1, difficulty);
          let whichGrid;
          [...ticTacTacGrid].forEach((grid) => {
            if (Number(grid.id.split("-")[1]) === aiMove) {
              whichGrid = grid;
            }
          });
          movesArray[i++] = {
            index: whichGrid.id.split("-")[1],
            value: value,
          };
          whichGrid.innerText = value;
          board1[Number(whichGrid.id.split("-")[1])] = value;
          winOrLose("computer");
        }
      }
    });
  });
}

/**
 * a function which calls the function that has logic for the player vs computer medium
 *
 * @param {}
 * @return {}
 *
 */
function playerVsComputerMedium() {
  mediumOrDifficultGame("medium");
}
/**
 * a function which calls the function that has logic for the player vs computer hard
 *
 * @param {}
 * @return {}
 *
 */
function playerVsComputerDifficult() {
  mediumOrDifficultGame("difficult");
}

/**
 * a function which find out the free grid and returns it
 *
 * @param {Array} board
 * @return {Array}
 */
function emptySquares(board) {
  return board.filter((s) => s.innerText === "");
}

/**
 * a function which finds the best spot for computer to place in player vs computer easy
 *
 * @param {Array} board
 * @return {html element}
 */
function bestSpot(board) {
  let emptySquaresData = emptySquares(board);
  if (emptySquaresData.length < 3) {
    return emptySquaresData[0];
  } else {
    return emptySquaresData[1];
  }
}
/**
 * a function which find out the free space in Array and returns it
 *
 * @param {Array} board
 * @return {Array}
 */
function emptySquares1(board) {
  return board.filter((s) => typeof s == "number");
}
/**
 * a function which finds the best spot for computer to place in player vs computer medium and hard
 *
 * @param {Array} board
 * @return {Number}
 */
function bestSpot1(board, difficulty) {
  return minimax(board, "O", 0, difficulty).index;
}

/**
 * a function which finds the optimal spot to make a move
 *
 * @param {Array} newBoard
 * @param {string} player
 * @param {Number} depth
 * @param {string} difficulty
 * @return {Number}
 */
function minimax(newBoard, player, depth, difficulty) {
  var availSpots = emptySquares1(newBoard);
  if (checkWinForMinMax(newBoard, "X")) {
    return { score: -10 };
  } else if (checkWinForMinMax(newBoard, "O")) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;
    if (player == "O") {
      var result = minimax(newBoard, "X", depth++, difficulty);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, "O", depth++, difficulty);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if (player === "O") {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  if (difficulty == "medium") {
    if (depth == 1) return moves[bestMove];
  } else {
    if (depth == 3) return moves[bestMove];
  }
  return moves[bestMove];
}
