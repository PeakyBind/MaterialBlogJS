// ./src/middlewares/checkAuthorization.js

import jwt from 'jsonwebtoken';
import apiService from '../APIService';
import store from '../store/store';

export default (to, from, next) => {
  if (from) {
    const token = store.state.jwt;
    if (token !== '') {
      const decoded = jwt.decode(token);
      const APIService = new apiService();
      APIService.getUser(decoded.userId).then((data) => {
        if (data.id === decoded.userId) {
          next();
        }
      });
    }
  }
};
