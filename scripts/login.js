// dom elements
var emailElement = document.getElementById("email");
var passwordElement = document.getElementById("password");
var loginContainer = document.getElementById("login-container");
var signupContainer = document.getElementById("signup-container");
var loginForm = document.getElementById("login-form");
var usernameElement = document.getElementById("username");
var signUpEmailElement = document.getElementById("signup-email");
var signupPasswordElement = document.getElementById("signup-password");
var signupConfirmPasswordElement = document.getElementById("confirm-password");
var playerVsPlayerButton = document.getElementById("player-vs-player-button");
var ticTacTacGrid = document.getElementsByClassName("grid");
var grids = document.getElementsByClassName("grids");
var ticTacToeContainer = document.getElementById("tic-tac-toe-container");
var diffLevel = document.getElementsByName("difficulty");
var closeButton = document.getElementById("close-button");
var winMessage = document.getElementById("win-message");
var scoreHeaderForPlayer1 = document.getElementById("score-header");
var winContainer = document.getElementById("win-container");
var winContainer1 = document.getElementById("win-container1");
var menu = document.getElementById("menu");
var profileButton = document.getElementById("profile-button");
var historyContainer = document.getElementById("history-container");
var historyButton = document.getElementById("history-button");
var personalInfoButton = document.getElementById("personal-info");
var deleteAccButton = document.getElementById("delete-acc-button");
var historyContent = document.getElementById("history-content");
var replayContainer = document.getElementById("replay-container");
var playButton = document.getElementsByClassName("play-button");
var personalInfo = document.getElementById("personal-info1");
var historyBackButton = document.getElementById("history-back-button");
var personalInfoBackButton = document.getElementById("personal-info-button");
var logoutButton = document.getElementById("logout-button");
var playerVsComputerButton = document.getElementById(
  "player-vs-computer-button"
);
var chooseOpponentContainer = document.getElementById(
  "choose-opponent-container"
);
//declare variables

var value = "X",
  username,
  email,
  historyDivNumber = 0,
  info,
  count = 0,
  winOrLoseOrTie,
  i = 0,
  matchDrawn = "",
  movesArray = [],
  board = [],
  board1 = [];
(possibleCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]),
  (monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]),
  (pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

/**
 * a function that sets the specific containers to none
 *
 * @param {}
 * @returns {}
 */
function setContainersToNone() {
  signupContainer.classList.add("display-none-container");
  chooseOpponentContainer.classList.add("display-none-container");
  ticTacToeContainer.classList.add("display-none-container");
  menu.classList.add("display-none-container");
  historyContainer.classList.add("display-none-container");
  replayContainer.classList.add("display-none-container");
  personalInfo.classList.add("display-none-container");
}

// validation container
document
  .getElementById("validation-close-button")
  .addEventListener("click", function () {
    document
      .getElementById("validation-message-container")
      .classList.remove("show-win-container");
  });

document
  .getElementById("validation-close-button1")
  .addEventListener("click", function () {
    document
      .getElementById("validation-message-container1")
      .classList.remove("show-win-container");
    signupConfirmPasswordElement.value = "";
    usernameElement.value = "";
    signupPasswordElement.value = "";
    signupContainer.classList.remove("display-show-container");
    signupContainer.classList.add("display-none-container");
    loginContainer.classList.remove("display-none-container");
    loginContainer.classList.add("display-show-container-1");
  });

document
  .getElementById("validation-close-button2")
  .addEventListener("click", function () {
    document
      .getElementById("validation-message-container2")
      .classList.remove("show-win-container");
    signupConfirmPasswordElement.value = "";
    usernameElement.value = "";
    signupPasswordElement.value = "";
  });
//player vs computer event listener
playerVsComputerButton.addEventListener("click", function difficultyLevel() {
  document.getElementById("player-2-score-header").innerText = "Computer (O)";
  for (i = 0; i < diffLevel.length; i++) {
    if (diffLevel[i].checked) {
      if (diffLevel[i].value === "Easy") {
        playerVsComputerEasy();
        makeChooseOpponentContainerNone();
        break;
      } else if (diffLevel[i].value === "Medium") {
        playerVsComputerMedium();
        makeChooseOpponentContainerNone();
        break;
      } else if (diffLevel[i].value === "Difficult") {
        playerVsComputerDifficult();
        makeChooseOpponentContainerNone();
        break;
      }
    }
  }
});

//history button
historyBackButton.addEventListener("click", () => {
  historyContainer.classList.remove("display-show-container-1");
  historyContainer.classList.add("display-none-container");
  ticTacToeContainer.classList.remove("display-none-container");
  ticTacToeContainer.classList.add("display-show-container-1");
});
//personal info button
personalInfoBackButton.addEventListener("click", () => {
  personalInfo.classList.remove("display-show-container-1");
  personalInfo.classList.add("display-none-container");
  ticTacToeContainer.classList.remove("display-none-container");
  ticTacToeContainer.classList.add("display-show-container-1");
});
//player vs player event listener
playerVsPlayerButton.addEventListener("click", function playTicTacToe() {
  // move to tic tac toe game
  document.getElementById("player-2-score-header").innerText = "player2 (O)";
  playerVsPlayerMatch();
  makeChooseOpponentContainerNone();
});

/**
 * a function which makes the choose opponent container none
 *
 * @param {}
 * @return {}
 */
function makeChooseOpponentContainerNone() {
  chooseOpponentContainer.classList.remove("display-show-container");
  chooseOpponentContainer.classList.add("display-none-container");
  ticTacToeContainer.classList.remove("display-none-container");
  ticTacToeContainer.classList.add("display-show-container-1");
}

/**
 * a function which hides the login container and shows the signup container
 *
 * @param {}
 * @return {}
 */
function signupInfo() {
  signupContainer.classList.remove("display-none-container");
  loginContainer.classList.remove("display-show-container-1");
  loginContainer.classList.add("display-none-container");
  signupContainer.classList.add("display-show-container");
}

/**
 * a function which has the logic for player vs player
 *
 * @param {}
 * @return {}
 */
function playerVsPlayerMatch() {
  [...ticTacTacGrid].forEach((grid) => {
    grid.addEventListener("click", () => {
      if (grid.innerText === "") {
        movesArray[i++] = {
          index: grid.id.split("-")[1],
          value: value,
        };
        grid.innerText = value;
        winOrLose("player2");
      }
    });
  });
}

/**
 * a function which decides the winner
 *
 * @param {string} playerOrComputer - player or computer
 * @return {}
 */
function winOrLose(playerOrComputer) {
  winOrLoseOrTie = winningLogic(possibleCombination);
  value = value == "X" ? (value = "O") : (value = "X");
  if (winOrLoseOrTie.winOrLose === "win") {
    count = 0;
    getWinnerMessage(playerOrComputer);
  } else {
    count++;
    matchDrawnMessage();
  }
}

/**
 * a function which returns a object which consists of the current match info
 *
 * @param {string} email
 * @param {string} username
 * @param {string} winOrLoseOrTie
 * @param {string} finalTime
 * @param {string} date
 * @param {string} movesArray
 * @param {string} match
 * @return {Object}
 */
function getGameHistory(
  email,
  username,
  winOrLoseOrTie,
  finalTime,
  date,
  movesArray,
  match
) {
  let p = {
    email: email,
    playerName: username,
    winner: winOrLoseOrTie,
    match: match,
    Time: finalTime,
    Date:
      date.getDate() +
      "-" +
      monthNames[date.getMonth()] +
      "-" +
      date.getFullYear(),
    moves: movesArray.filter((s) => s !== null),
  };
  return p;
}
// close button of validation message container
closeButton.addEventListener("click", async () => {
  var date = new Date();
  var hours = date.getHours();
  var AmOrPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  var minutes = date.getMinutes();
  var finalTime = hours + ":" + minutes + " " + AmOrPm;
  var playerHistory,
    match =
      username +
      " vs " +
      document.getElementById("player-2-score-header").innerText.split("(")[0];
  [...ticTacTacGrid].forEach((grid) => {
    board.push(grid);
  });
  if (matchDrawn == "") {
    playerHistory = getGameHistory(
      email,
      username,
      winOrLoseOrTie.player,
      finalTime,
      date,
      movesArray,
      match
    );
  } else {
    playerHistory = getGameHistory(
      email,
      username,
      matchDrawn,
      finalTime,
      date,
      movesArray,
      match
    );
    matchDrawn = "";
  }
  await updateTheuserDetails(playerHistory);
  movesArray = [];
  i = 0;
  winContainer.classList.remove("show-win-container");
});

//profile button
profileButton.addEventListener("click", () => {
  menu.classList.toggle("display-show-container");
});

//hidtory button
historyButton.addEventListener("click", async () => {
  let info = await getUserdetails();
  historyContent.replaceChildren();
  if (info[email].history) {
    createHistoryDiv(info, historyContent);
    [...playButton].forEach((btn) => {
      btn.addEventListener("click", () => {
        let index1 = btn.id.split("-")[2];
        let cnt = 0;
        let k = setInterval(() => {
          if (cnt < info[email].history[index1].moves.length) {
            grids[
              Number(info[email].history[index1].moves[cnt].index)
            ].innerText = info[email].history[index1].moves[cnt].value;
            cnt++;
          } else {
            winContainer1.classList.add("show-win-container");
            if (info[email].history[index1].winner == "Match drawn") {
              document.getElementById("win-message1").innerText =
                info[email].history[index1].winner;
            } else {
              document.getElementById("win-message1").innerText =
                info[email].history[index1].winner + " won";
            }
            document
              .getElementById("close-button1")
              .addEventListener("click", () => {
                winContainer1.classList.remove("show-win-container");
                replayContainer.classList.remove("display-show-container-2");
                replayContainer.classList.add("display-none-container");
                historyContainer.classList.remove("display-none-container");
                historyContainer.classList.add("display-show-container-1");
                clearInterval(k);
              });
          }
        }, 1000);
        [...grids].forEach((grid) => {
          grid.innerText = "";
        });

        historyContainer.classList.remove("display-show-container-1");
        historyContainer.classList.add("display-none-container");
        replayContainer.classList.add("display-show-container-2");
        replayContainer.classList.remove("display-none-container");
        document.getElementById("score-header1").innerText =
          info[email].username + "(X)";
      });
    });

    historyContainer.classList.remove("display-none-container");
    historyContainer.classList.add("display-show-container-1");
    ticTacToeContainer.classList.remove("display-show-container-1");
    ticTacToeContainer.classList.add("display-none-container");
  } else {
    alert("nothing to show");
  }
});

/**
 * a function that create the history content div
 *
 * @param {object} info
 * @param {html element} historyContent
 */
function createHistoryDiv(info, historyContent) {
  for (let i = 0; i < info[email].history.length; i++) {
    var mainDiv = document.createElement("div");
    var subDiv1 = document.createElement("div");
    var subDiv2 = document.createElement("div");
    var innerDiv = document.createElement("div");
    var para = document.createElement("p");
    var img = document.createElement("img");
    var dateAndTime = document.createElement("p");
    var button = document.createElement("button");
    mainDiv.setAttribute("class", "first");
    subDiv1.setAttribute("class", "match match-div");
    subDiv2.setAttribute("class", "winner match-div");
    img.setAttribute("src", "./assets/play.png");
    img.setAttribute("class", "play-image");
    dateAndTime.setAttribute("class", `date-time`);
    button.setAttribute("class", `play-button`);
    button.setAttribute("id", `play-button-${i}`);
    innerDiv.setAttribute("class", "inner-div");
    para.setAttribute("class", "history-div-para");
    if (info[email].history[i].winner === "Match drawn") {
      para.innerText = info[email].history[i].winner;
    } else {
      para.innerText = info[email].history[i].winner + " won the match";
    }
    dateAndTime.innerText =
      info[email].history[i].Time + "   " + info[email].history[i].Date;
    button.appendChild(img);
    innerDiv.appendChild(para);
    innerDiv.appendChild(button);
    subDiv2.appendChild(innerDiv);
    subDiv2.appendChild(dateAndTime);
    subDiv1.innerText = info[email].history[i].match;
    mainDiv.appendChild(subDiv1);
    mainDiv.appendChild(subDiv2);
    historyContent.appendChild(mainDiv);
  }
}
//personalinfo button
personalInfoButton.addEventListener("click", async () => {
  let info = await getUserdetails();
  let winCnt = 0,
    tieCnt = 0,
    loseCnt = 0;
  if (info[email].history) {
    ticTacToeContainer.classList.remove("display-show-container-1");
    ticTacToeContainer.classList.add("display-none-container");
    personalInfo.classList.remove("display-none-container");
    personalInfo.classList.add("display-show-container-1");
    for (let i = 0; i < info[email].history.length; i++) {
      if (info[email].history[i].winner === username) {
        winCnt++;
      } else if (
        info[email].history[i].winner === "Computer (O)" ||
        info[email].history[i].winner === "player2 (O)"
      ) {
        loseCnt++;
      } else {
        tieCnt++;
      }
    }
    document.getElementById("name-value").innerText = info[email].username;
    document.getElementById("email-value").innerText = info[email].signupEmail;
    document.getElementById("matches-value").innerText =
      winCnt + loseCnt + tieCnt;
    document.getElementById("won-value").innerText = winCnt;
    document.getElementById("lost-value").innerText = loseCnt;
  } else {
    alert("nothing to show");
  }
});
//delete account button
deleteAccButton.addEventListener("click", async () => {
  deleteAccount(email);
  ticTacToeContainer.classList.remove("display-show-container-1");
  ticTacToeContainer.classList.add("display-none-container");
  loginContainer.classList.remove("display-none-container");
  loginContainer.classList.add("display-show-container");
  setTimeout(() => {
    window.location.reload(true);
  }, 200);
});
//player vs computer Easy

window.onload = setContainersToNone();
