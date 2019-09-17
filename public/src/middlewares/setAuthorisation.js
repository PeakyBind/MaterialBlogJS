import axios from "axios";

export default function () {
  if (sessionStorage.getItem('user') && sessionStorage.getItem('jwt')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
  }
}
