// login event listener
loginForm.addEventListener("submit", async function loginCredentials(e) {
  e.preventDefault();
  email = emailElement.value;
  var userInput = {
    email: emailElement.value.trim(),
    password: passwordElement.value.trim(),
  };
  let passOrFail = await checkForUsers(userInput);
  if (passOrFail === "failed") {
    document
      .getElementById("validation-message-container")
      .classList.add("show-win-container");
    document.getElementById("validation-message").innerText = "Login Failed";
  } else {
    info = await getUserdetails();
    if (info[email].username) {
      username = info[email].username;
      scoreHeaderForPlayer1.innerText = username + "(X)";
    }
  }
  emailElement.value = "";
  passwordElement.value = "";
});

//logout button
logoutButton.addEventListener("click", () => {
  ticTacToeContainer.classList.remove("display-show-container-1");
  ticTacToeContainer.classList.add("display-none-container");
  loginContainer.classList.remove("display-none-container");
  loginContainer.classList.add("display-show-container-1");
  for (i = 0; i < diffLevel.length; i++) {
    diffLevel[i].checked = false;
  }
  setTimeout(() => {
    window.location.reload(true);
  }, 200);
});

//sign up event listener
signupContainer.addEventListener("submit", function signupCredentials(e) {
  e.preventDefault();
  if (
    signupPasswordElement.value.trim() ===
    signupConfirmPasswordElement.value.trim()
  ) {
    var signUpInfo = {
      username: usernameElement.value.trim(),
      signupEmail: signUpEmailElement.value.trim(),
      signupPassword: signupPasswordElement.value.trim(),
      confirmPassword: signupConfirmPasswordElement.value.trim(),
    };
    storeUserValues(signUpInfo);
  } else {
    document
      .getElementById("validation-message-container2")
      .classList.add("show-win-container");
    document.getElementById("validation-message2").innerText =
      "password and confirm password should match";
    signupPasswordElement.value = "";
    signupConfirmPasswordElement.value = "";
  }
  signUpEmailElement.value = "";
});
