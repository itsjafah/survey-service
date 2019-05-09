const express = require("express");
const app = express();

// this is a route handler with express

// the request handler has an argument of an arrow function that is automatically called by Express whenever there is a get request sent to the '/' route

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;

// this variable defines the port that we will be listening to. If we're in production phase, we use what's to the left of the OR operator (given to us by Heroku). If it doesn't exist (in development mode), use 5000 instead

app.listen(PORT);

// this listen method is Express telling Node to listen for all requests coming into port 5000
