
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0edafaufe7eaf223fjaefa3feaeelknvwx4afufhaeflbehbv442432Ufjea3';

module.exports = {
  generateTokenForUsers: (userData) => {
    return jwt.sign(
      {
        userId: userData._id
      },
      JWT_SIGN_SECRET,
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
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) {
          userId = jwtToken.userId
        }
      } catch (e) {

      }
      return userId
    }
  }
};
