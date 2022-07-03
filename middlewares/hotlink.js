const hotLink = (req, res, next) => {
  if (
    req.headers["sec-fetch-site"] === "cross-site" &&
    req.headers["sec-fetch-dest"] !== "document"
  ) {
    res.status(403).send("Access Forbidden");
  } else {
    next();
  }
};

module.exports = hotLink;
