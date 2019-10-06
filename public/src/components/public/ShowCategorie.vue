<!-- ./src/components/public/ShowCategorie.vue -->

<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <h1 class="page-header">
      Material Design for Bootstrap
      <small>made with love</small>
    </h1>

    <div v-for="article in articles">

      <h2><router-link :to="{ name: 'showArticle', params: { id: article.id }}">{{ article.titre }}</router-link></h2>

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
import { mapGetters } from 'vuex';
import convertDate from '../../utils/convertDate';

export default {
  name: 'ShowCategorie',
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    convertDate,
  },
  watch: {
    $route(to, from) {
      this.articles = this.getArticlesByCategorie(this.$route.params.id);
    },
  },
  computed: {
    ...mapGetters([
      'getArticlesByCategorie',
    ]),
  },
  mounted() {
    this.articles = this.getArticlesByCategorie(this.$route.params.id);
  },
};
</script>
