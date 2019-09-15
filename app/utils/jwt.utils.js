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
    )
  }
};
