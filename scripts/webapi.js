/**
 * a function which stores the user data in file
 *
 * @param {object} userData
 * @return {}
 */
async function storeUserDataInFile(userData) {
  var res = await fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  let value = await res.json();
  if (value === "error") {
    alert("unknown error");
  } else if (value === "email already exists") {
    document
      .getElementById("validation-message-container1")
      .classList.add("show-win-container");
    document.getElementById("validation-message1").innerText =
      "Email alraedy exists";
  } else {
    document
      .getElementById("validation-message-container1")
      .classList.add("show-win-container");
    document.getElementById("validation-message1").innerText =
      "Registered Successfully";
  }
}

function storeUserValues(userData) {
  storeUserDataInFile(userData);
}

/**
 * a function which checks whether the user is there are not
 *
 * @param {Object} user
 * @return {string}
 */
async function checkForUsers(user) {
  var res = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  let val = await res.json();
  if (val === "failed") {
    return "failed";
  } else {
    //take to choose opponent page
    chooseOpponentContainer.classList.remove("display-none-container");
    chooseOpponentContainer.classList.add("display-show-container");
    loginContainer.classList.remove("display-show-container-1");
    loginContainer.classList.add("display-none-container");
  }
}

/**
 * a function which get the user details
 *
 * @param {}
 * @return {}
 */
async function getUserdetails() {
  var res = await fetch(`http://localhost:3000/getuserdetails`, {
    method: "GET",
    Headers: {
      "Content-Type": "application/json",
    },
  });
  let val = await res.json();
  return val;
}

/**
 * a function which updates the user details in the file
 *
 * @param {Object} playerHistory
 * @return {}
 */
async function updateTheuserDetails(playerHistory) {
  var res = await fetch(`http://localhost:3000/updateUserDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerHistory),
  });
}

/**
 * a function which deletes the user account
 *
 * @param {string} email
 * @return {}
 */
async function deleteAccount(email) {
  var email1 = {
    email: email,
  };
  var res = await fetch(`http://localhost:3000/deleteAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email1),
  });
}
