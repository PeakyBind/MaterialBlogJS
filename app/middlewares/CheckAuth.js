// ./app/middlewares/CheckAuth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_SECRET);
    req.userData = decoded;
  } catch(err) {
    return res.status(401).json({
      message: 'Echec de l\'authentification'
    });
  }
  next()
};
