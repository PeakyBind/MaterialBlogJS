<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <h1 class="page-header">
      Material Design for Bootstrap
      <small>made with love</small>
    </h1>

    <div v-for="article in articles">

      <h2> <router-link :to="{ name: 'showArticle', params: { id: article.id }}">{{ article.titre }}</router-link></h2>

      <p class="lead">
        by <a href="#">{{ article.auteur.pseudo }}</a>
      </p>

      <p> Posted on {{ convertDate(article.createdAt) }}</p>

      <hr>
      <img class="img-responsive z-depth-2" :src="article.image" alt="">
      <hr>

      <div>{{ article.contenu }}</div>

      <a href="#">
        <button type="button" class="btn btn-info waves-effect waves-light">Read more</button>
      </a>

    </div>
  </div>
</template>

<script>
  import APIService from '../../APIService';
  import convertDate from "../../utils/convertDate";
  const apiService = new APIService();

  export default {
    name: 'ListArticles',
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
      },
      convertDate,
    },
    mounted() {
      this.getArticles();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
