const session = require("express-session");
const { randomBytes } = require("node:crypto");
const RedisStore = require("connect-redis")(session);
const { redisClient } = require("./redis");

const serverSession = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 600000, secure: false },
  genid: function (req) {
    return randomBytes(32).toString("hex");
  },
  store: new RedisStore({ client: redisClient }),
});

module.exports = serverSession;
