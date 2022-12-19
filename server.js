const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const PORT = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/index.html", express.static(__dirname));
//login
app.post("/login", (req, res) => {
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var myObject = JSON.parse(userData);
  if (req.body.email in myObject) {
    if (req.body.password === myObject[req.body.email].signupPassword) {
      res.json("sucess");
    } else {
      res.json("failed");
    }
  } else {
    res.json("failed");
  }
});
//signup
app.post("/signup", (req, res) => {
  var data = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var myObject = JSON.parse(userData);
  if (req.body.signupEmail in myObject) {
    res.json("email already exists");
  } else {
    myObject[req.body.signupEmail] = data;
    fs.writeFile(
      "./scripts/userDetails.json",
      JSON.stringify(myObject),
      (err) => {
        if (err) {
          res.json("error");
        } else {
          res.json("success");
        }
      }
    );
  }
});
// getting the user details
app.get("/getuserdetails", (req, res) => {
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var myObject = JSON.parse(userData);
  res.json(myObject);
});
// update the user details
app.post("/updateUserDetails", (req, res) => {
  var data = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var myObject = JSON.parse(userData);
  if (myObject[data.email].history) {
    myObject[data.email].history[myObject[data.email].history.length] =
      req.body;
  } else {
    myObject[data.email].history = [];
    myObject[data.email].history[0] = req.body;
  }
  fs.writeFile(
    "./scripts/userDetails.json",
    JSON.stringify(myObject),
    (err) => {
      if (err) {
        res.json("error");
      } else {
        res.json("success");
      }
    }
  );
});
//delete account
app.post("/deleteAccount", (req, res) => {
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var myObject = JSON.parse(userData);
  delete myObject[req.body.email];
  fs.writeFile(
    "./scripts/userDetails.json",
    JSON.stringify(myObject),
    (err) => {
      if (err) {
        res.json("error");
      } else {
        res.json("account deleted");
      }
    }
  );
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("server is running in port 3000");
  }
});
