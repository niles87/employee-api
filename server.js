require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const {
  ContentSecurityPolicy,
  xContent,
  referrerPolicy,
} = require("./config/helmet");
const session = require("./config/session");
require("./config/passport");

const routes = require("./controllers");
const hotLink = require("./middlewares/hotlink");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(referrerPolicy);
app.use(xContent);
app.use(ContentSecurityPolicy);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(hotLink);

app.use(express.static(path.join(__dirname, "/public")));

// turn on routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
