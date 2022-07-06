const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  port: process.env.REDPORT,
  legacyMode: true,
});
redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch(console.error);

module.exports = { redisClient };
