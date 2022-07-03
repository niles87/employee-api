const session = require("express-session");

const serverSession = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 600000, secure: false },
});

module.exports = serverSession;
