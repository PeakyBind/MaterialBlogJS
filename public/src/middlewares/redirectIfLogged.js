import jwt from 'jsonwebtoken';
import apiService from '../APIService';

export default (to, from, next) => {
  if (from) {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      const decoded = jwt.decode(token);
      const APIService = new apiService();
      APIService.getUser(decoded.userId).then((data) => {
        if (
          data.id === decoded.userId &&
          decoded.exp < Date.now()
        ) {
          next('/admin')
        } else {
          sessionStorage.removeItem('jwt');
          sessionStorage.removeItem('user');
        }
      });
    }
    next();
  }
};
