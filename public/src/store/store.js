// ./src/store/store.js

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import APIService from '../APIService';

const apiService = new APIService();

Vue.use(Vuex);

const vuexSessionStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  state: {
    articles: [],
    categories: [],
    auteurs: [],
    user: '',
    jwt: '',
  },
  getters: {
    getArticleById: state => id => state.articles.find(article => article.id === id),
    getAuteurById: state => id => state.auteurs.find(auteur => auteur.id === id),
    getCategorieById: state => id => state.categories.find(categorie => categorie.id === id),
    getArticlesByCategorie: state => categorieId => state.articles.filter(
      article => article.categories.find(
        categorie => categorie.id === categorieId,
      ),
    ),
  },
  mutations: {
    getArticles(state, articles) {
      state.articles = articles;
    },
    addArticle(state, payload) {
      Object.defineProperty(
        payload.article.auteur,
        'pseudo',
        { value: payload.auteur.pseudo },
      );
      state.articles.push(payload.article);
    },
    editArticle(state, payload) {
      Object.defineProperty(
        payload.article.auteur,
        'pseudo',
        { value: payload.auteur.pseudo },
      );
      const articleToEdit = state.articles.find(element => element.id === payload.article.id);
      const articleToEditId = state.articles.indexOf(articleToEdit);
      state.articles.splice(articleToEditId, 1, payload.article);
    },
    deleteArticle(state, id) {
      const articleToDelete = state.articles.find(element => element.id === id);
      const articleToDeleteId = state.articles.indexOf(articleToDelete);
      state.articles.splice(articleToDeleteId, 1);
    },
    getAuteurs(state, auteurs) {
      state.auteurs = auteurs;
    },
    addAuteur(state, auteur) {
      state.auteurs.push(auteur);
    },
    editAuteur(state, auteur) {
      const auteurToEdit = state.auteurs.find(element => element.id === auteur.id);
      const auteurToEditId = state.auteurs.indexOf(auteurToEdit);
      state.auteurs.splice(auteurToEditId, 1, auteur);
    },
    deleteAuteur(state, id) {
      const auteurToDelete = state.auteurs.find(element => element.id === id);
      const auteurToDeleteId = state.auteurs.indexOf(auteurToDelete);
      state.auteurs.splice(auteurToDeleteId, 1);
    },
    getCategories(state, categories) {
      state.categories = categories;
    },
    addCategorie(state, categorie) {
      state.categories.push(categorie);
    },
    editCategorie(state, categorie) {
      const categorieToEdit = state.categories.find(element => element.id === categorie.id);
      const categorieToEditId = state.categories.indexOf(categorieToEdit);
      state.categories.splice(categorieToEditId, 1, categorie);
    },
    deleteCategorie(state, id) {
      const categorieToDelete = state.categories.find(element => element.id === id);
      const categorieToDeleteId = state.categories.indexOf(categorieToDelete);
      state.categories.splice(categorieToDeleteId, 1);
    },
    logIn(state, data) {
      if (data.user && data.token) {
        state.user = data.user;
        state.jwt = data.token;
      }
    },
  },
  actions: {
    getArticles({ commit }) {
      apiService.getArticles().then(data => commit('getArticles', data.articles));
    },
    addArticle(context, form) {
      apiService.addArticle(form).then((article) => {
        const auteur = context.getters.getAuteurById(article.auteur.id);
        context.commit('addArticle', { article, auteur });
      });
    },
    editArticle(context, form) {
      apiService.editArticle(form.get('id'), form).then((article) => {
        const auteur = context.getters.getAuteurById(article.auteur.id);
        context.commit('editArticle', { article, auteur });
      });
    },
    deleteArticle({ commit }, id) {
      apiService.deleteArticle(id).then(() => commit('deleteArticle', id));
    },
    getAuteurs({ commit }) {
      apiService.getAuteurs().then(data => commit('getAuteurs', data.auteurs));
    },
    addAuteur({ commit }, form) {
      apiService.addAuteur(form).then((auteur) => {
        commit('addAuteur', auteur);
      });
    },
    editAuteur(context, form) {
      apiService.editAuteur(form.id, form).then((auteur) => {
        context.commit('editAuteur', auteur);
      });
    },
    deleteAuteur({ commit }, id) {
      apiService.deleteAuteur(id).then(() => commit('deleteAuteur', id));
    },
    getCategories({ commit }) {
      apiService.getCategories().then(data => commit('getCategories', data.categories));
    },
    addCategorie({ commit }, form) {
      apiService.addCategorie(form).then((categorie) => {
        commit('addCategorie', categorie);
      });
    },
    editCategorie(context, form) {
      apiService.editCategorie(form.id, form).then((categorie) => {
        context.commit('editCategorie', categorie);
      });
    },
    deleteCategorie({ commit }, id) {
      apiService.deleteCategorie(id).then(() => commit('deleteCategorie', id));
    },
    logIn({ commit }, form) {
      apiService.logIn(form).then((data) => {
        commit('logIn', data);
      });
    },
  },
  plugins: [vuexSessionStorage.plugin],
});
