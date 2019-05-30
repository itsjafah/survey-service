const express = require("express");
const passport = require("passport");
// passport is the library that handles authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// GoogleStrategy instructs passport how to handle authentication requests specifically for Google
const app = express();
const keys = require("./config/keys");
// import this so we can pass these keys to the GoogleStrategy so that it can properly identify our app to the Google OAUTH API

// passport.use is like a generic register. We pass the GoogleStrategy in as a parameter since that is the specific authentication we are making in this case.

// the new GoogleStrategy constructor function below creates a new instance of the google passport Strategy. Essentially it tells the app to authenticate users with google. We pass configuration options as a parameter to the function that instructs the GoogleStrategy how to authenticate users in our application.

// the third property in the object we pass to GoogleStrategy, callbackURL, is the route that the user will be sent to after they grant permission (give consent) to login to our app with Google

// the accessToken function sends back information about the user and allows us to store them in our database. the accessToken itself idenditifies the user.

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
    }
  )
);

// the route handler below tells express to involve Passport. It will send the user to Passport, where they will be entered into the authentication flow. NOTE: the GoogleStrategy constructor has an embedded identifier that we don't see called 'google'. That is why were able to pass 'google' to the passport.authenticate function in the app.get method below.

// the scope argument specifies to google (google servers) what access we want to have inside of this user's profile. Below, we are asking for the profile info and their email. Google has a list of different scopes/permissions we could ask for (like contact list, images in google drive accounts, read all of their emails, etc).

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// the route handler below is executed after we have the url code that identifies the user after they have given their consent to use the app. It sees this code and knows that it's not the first attempt to authenticate. GoogleStrategy is going to handle the request differently. It won't kick the user into the OAUTH flow, instead it will exchange the code for the actual user profile.

app.get("/auth/google/callback", passport.authenticate("google"));

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
