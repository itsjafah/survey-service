const passport = require("passport");
// passport is the library that handles authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// GoogleStrategy instructs passport how to handle authentication requests specifically for Google

const keys = require("../config/keys");
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
