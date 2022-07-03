require("dotenv").config();
const passport = require("passport");
const GithubStrategy = require("passport-github2");
const { Person } = require("../models");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const { rowCount, rows } = Person.findUser({
          github_id: profile.id.toString(),
        });

        if (rowCount > 0) {
          return done(null, rows[0]);
        } else {
          return done(null, { github_id: profile.id.toString() });
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
