const express = require("express");
const app = express();

// this is a route handler with express

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);