const express = require("express");
const passport = require("passport");
// passport is the library that handles authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// GoogleStrategy instructs passport how to handle authentication requests specifically for Google
const app = express();

// passport.use is like a generic register. We pass the GoogleStrategy in as a parameter since that is the specific authentication we are making in this case.

// the new GoogleStrategy constructor function below creates a new instance of the google passport Strategy. Essentially it tells the app to authenticate users with google. We pass a parameter to the function that instructs the GoogleStrategy how to authenticate users in our application.

// client ID 566592909212-ppkh07mf9g3fpruhg5tvp67sei6gv8cg.apps.googleusercontent.com
// client secret IIfe7Knftuw0YVrr5ODpmf7z

passport.use(new GoogleStrategy());

// below is an example of a route handler with express

// the request handler has an argument of an arrow function that is automatically called by Express whenever there is a get request sent to the '/' route

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

const PORT = process.env.PORT || 5000;

// this variable defines the port that we will be listening to. If we're in production phase, we use what's to the left of the OR operator (given to us by Heroku). If it doesn't exist (in development mode), use 5000 instead

app.listen(PORT);

// this listen method is Express telling Node to listen for all requests coming into port 5000

// http://localhost:5000/auth/google/callback
