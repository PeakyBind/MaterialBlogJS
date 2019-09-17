var jwt = require('jsonwebtoken');

module.exports = {
  generateTokenForUsers: (userData) => {
    return jwt.sign(
      {
        userId: userData._id
      },
      process.env.JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      }
    );
  },
  parseAuthorization: (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', ''): null;
  },
  getUserId: (authorization) => {
    var userId = '';
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
        if (jwtToken != null) {
          userId = jwtToken.userId
        }
      } catch (e) {
        console.log(e);
      }
      return userId
    }
  }
};
