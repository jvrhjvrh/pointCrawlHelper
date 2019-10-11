const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(bearerHeader){
    const [, token] = bearerHeader.split(' ');
    const verifiedToken = jwt.verify(token, 'minhaChaveSecreta');
    req.verifiedToken = verifiedToken;
    return next();
  } else {
    res.status(403).send({error: "You're not authorized to view this page"});
  }
};

module.exports = {
  isAuthenticated,
};