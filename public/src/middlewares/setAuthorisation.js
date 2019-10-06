// ./src/middlewares/setAuthorization.js

import axios from 'axios';
import store from '../store/store';

export default function () {
  if (store.state.user !== '' && store.state.jwt !== '') {
    axios.defaults.headers.common.Authorization = `Bearer ${store.state.jwt}`;
  }
}
