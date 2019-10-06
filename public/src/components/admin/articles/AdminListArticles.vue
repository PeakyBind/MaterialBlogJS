<!-- ./src/components/admin/articles/AdminListArticles.vue -->

<template>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Gestion des posts</h1>
      <div><router-link :to="{ name: 'addArticle' }">Ajouter un enregistrement</router-link></div>

      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Id</th>
          <th>Titre</th>
          <th>Slug</th>
          <th>datePublication</th>
          <th>Texte</th>
          <th>Media</th>
          <th>Auteur</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles">
          <td>{{ article.id }}</td>
          <td>{{ article.titre }}</td>
          <td>{{ article.slug }}</td>
          <td>{{ convertDate(article.createdAt) }}</td>
          <td>{{ article.contenu }}</td>
          <td>{{ article.image }}</td>
          <td>{{ article.auteur.pseudo }}</td>
          <td>
            <router-link :to="{ name: 'editArticle', params: { id: article.id } }">Editer</router-link> |
            <a href="#" @click.prevent="deleteArticle(article.id)">Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import convertDate from '../../../utils/convertDate';

export default {
  name: 'AdminListArticles',
  methods: {
    ...mapActions([
      'deleteArticle',
    ]),
    convertDate,
  },
  computed: mapState([
    'articles',
  ]),
};
</script>
