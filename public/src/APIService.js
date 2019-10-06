// ./src/APIService.js

import axios from 'axios';

const API_URL = 'http://localhost:4000';

export default class {
  // ROUTES DES ARTICLES

  getArticle(id) {
    const url = `${API_URL}/articles/${id}`;
    return axios.get(url).then(response => response.data);
  }

  getArticles() {
    const url = `${API_URL}/articles/`;
    return axios.get(url).then(response => response.data);
  }

  addArticle(data) {
    const url = `${API_URL}/articles/create`;
    return axios.post(url, data).then(response => response.data);
  }

  editArticle(id, data) {
    const url = `${API_URL}/articles/${id}`;
    return axios.put(url, data).then(response => response.data);
  }

  deleteArticle(id) {
    const url = `${API_URL}/articles/${id}`;
    return axios.delete(url, id).then(response => response.data);
  }

  // ROUTES DES USERS

  getUser(id) {
    const url = `${API_URL}/users/${id}`;
    return axios.get(url).then(response => response.data);
  }

  logIn(data) {
    const url = `${API_URL}/users/login/`;
    return axios.post(url, data).then(response => response.data);
  }

  // ROUTES DES AUTEURS

  getAuteur(id) {
    const url = `${API_URL}/auteurs/${id}`;
    return axios.get(url).then(response => response.data);
  }

  getAuteurs() {
    const url = `${API_URL}/auteurs/`;
    return axios.get(url).then(response => response.data);
  }

  addAuteur(data) {
    const url = `${API_URL}/auteurs/create`;
    return axios.post(url, data).then(response => response.data);
  }

  editAuteur(id, data) {
    const url = `${API_URL}/auteurs/${id}`;
    return axios.put(url, data).then(response => response.data);
  }

  deleteAuteur(id) {
    const url = `${API_URL}/auteurs/${id}`;
    return axios.delete(url, id).then(response => response.data);
  }

  // ROUTES DES CATEGORIES

  getCategorie(id) {
    const url = `${API_URL}/categories/${id}`;
    return axios.get(url).then(response => response.data);
  }

  getCategories() {
    const url = `${API_URL}/categories/`;
    return axios.get(url).then(response => response.data);
  }

  addCategorie(data) {
    const url = `${API_URL}/categories/create`;
    return axios.post(url, data).then(response => response.data);
  }

  editCategorie(id, data) {
    const url = `${API_URL}/categories/${id}`;
    return axios.put(url, data).then(response => response.data);
  }

  deleteCategorie(id) {
    const url = `${API_URL}/categories/${id}`;
    return axios.delete(url, id).then(response => response.data);
  }
}
