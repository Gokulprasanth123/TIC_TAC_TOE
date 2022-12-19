/**
 * a function which decides the winner
 *
 * @param {string} playerOrComputer
 * @return {}
 */
function getWinnerMessage(playerOrComputer) {
  if (winOrLoseOrTie.player == "player1") {
    winMessage.innerText = username + " won the match";
    winOrLoseOrTie.player = username;
  } else {
    winMessage.innerText = playerOrComputer + " won the match";
  }
  winContainer.classList.add("show-win-container");
  resetTheGrid();
}

/**
 * a function which checks for match drawn
 *
 * @param {}
 * @return {}
 *
 */
function matchDrawnMessage() {
  if (count == 9) {
    matchDrawn = "Match drawn";
    count = 0;
    winMessage.innerText = "match drawn";
    winContainer.classList.add("show-win-container");
    resetTheGrid();
  }
}

/**
 * a function which resets the grid
 *
 * @param {}
 * @return {}
 *
 */
function resetTheGrid() {
  value = "X";
  [...ticTacTacGrid].forEach((grid) => {
    grid.innerText = "";
  });
  board = [];
  board1 = Array.from(Array(9).keys());
}

/**
 * a function which has the winning logic for player vs player
 *
 * @param {Array} possibleCombination
 * @return {Object}
 */
function winningLogic(possibleCombination) {
  for (let i = 0; i < possibleCombination.length; i++) {
    let j = 0;
    if (
      ticTacTacGrid[possibleCombination[i][j]].innerText &&
      ticTacTacGrid[possibleCombination[i][j + 1]].innerText &&
      ticTacTacGrid[possibleCombination[i][j + 2]].innerText &&
      ticTacTacGrid[possibleCombination[i][j]].innerText ===
        ticTacTacGrid[possibleCombination[i][j + 1]].innerText &&
      ticTacTacGrid[possibleCombination[i][j + 1]].innerText ===
        ticTacTacGrid[possibleCombination[i][j + 2]].innerText
    ) {
      if (ticTacTacGrid[possibleCombination[i][j]].innerText === "X") {
        return { winOrLose: "win", player: "player1" };
      } else if (ticTacTacGrid[possibleCombination[i][j]].innerText === "O") {
        return {
          winOrLose: "win",
          player: document.getElementById("player-2-score-header").innerText,
        };
      }
    }
  }
  return "no result";
}

/**
 * a function which has winning logic especially for min max algorithm
 *
 * @param {Array} board
 * @param {string} player
 * @return {Object}
 */
function checkWinForMinMax(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of possibleCombination.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}
