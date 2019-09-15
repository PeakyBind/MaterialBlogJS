import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default class {
  constructor () {

  }
  getArticles() {
    const url = API_URL + '/articles/';

    return axios.get(url).then(response => response.data);
  }

  getArticle(id) {
    const url = API_URL + '/articles/' + id;
    return axios.get(url).then(response => response.data);
  }
}
