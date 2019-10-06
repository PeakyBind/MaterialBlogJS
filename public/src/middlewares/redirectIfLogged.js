// ./src/middlewares/redirectIfLogged.js

import jwt from 'jsonwebtoken';
import store from '../store/store';
import apiService from '../APIService';

export default (to, from, next) => {
  if (from) {
    const token = store.state.jwt;
    if (token !== '') {
      const decoded = jwt.decode(token);
      const APIService = new apiService();
      APIService.getUser(decoded.userId).then((data) => {
        if (
          data.id === decoded.userId
          && decoded.exp < Date.now()
        ) {
          next('/admin');
        } else {
          store.state.jwt = '';
          store.state.user = '';
        }
      });
    }
    next();
  }
};
