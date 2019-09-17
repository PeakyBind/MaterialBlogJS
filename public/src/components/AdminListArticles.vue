<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Gestion des posts</h1>
      <div><router-link :to="{ name: 'add' }">Ajouter un enregistrement</router-link></div>

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
          <td>material-design-for-bootstrap</td>
          <td>2017-02-02 00:00:00</td>
          <td>{{ article.contenu }}</td>
          <td>{{ article.image }}</td>
          <td>{{ article.auteur.pseudo }}</td>
          <td>
            <a href="#">Edit</a> |
            <a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/posts/delete/2">Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  import APIService from '../APIService';
  const apiService = new APIService();

  export default {
    name: 'AdminListArticles',
    data() {
      return {
        articles: []
      }
    },
    methods: {
      getArticles() {
        apiService.getArticles().then((data) => {
          this.articles = data.articles;
        })
      }
    },
    mounted() {
      this.getArticles();
    }
  }
</script>
