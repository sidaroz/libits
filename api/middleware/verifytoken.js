const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data) => {
      if (err) {
        res.status(403).json(err);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403).json({ error: "Missing token" });
  }
}

module.exports = { verifyToken };
