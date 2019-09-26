<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <!-- Blog Post -->

    <!-- Title -->
    <h1>{{ article.titre }}</h1>

    <!-- Author -->
    <p class="lead">
      by <a href="#">{{ auteurPseudo }}</a>
    </p>

    <hr>

    <!-- Date/Time -->
    <p>Posted on
      {{ convertDate(article.createdAt) }}</p>

    <hr>

    <!-- Preview Image -->
    <img class="img-responsive z-depth-2" :src="article.image" alt="">

    <hr>

    <!-- Post Content -->
    <div>{{ article.contenu }}</div>


    <hr>
  </div>
</template>

<script>
  import APIService from '../../APIService';
  import convertDate from "../../utils/convertDate";
  const apiService = new APIService();

  export default {
    name: 'showArticle',
    data() {
      return {
        auteurPseudo: '',
        article: {}
      }
    },
    methods: {
      getArticle() {
        apiService.getArticle(this.$route.params.id).then((data) => {
          this.article = data;
          this.auteurPseudo = data.auteur.pseudo;
        })
      },
      convertDate,
    },
    mounted() {
      this.getArticle();
    }
  }
</script>
