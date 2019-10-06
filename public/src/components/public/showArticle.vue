<!-- ./src/components/public/showArticle.vue -->

<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <!-- Blog Post -->

    <!-- Title -->
    <h1>{{ article.titre }}</h1>

    <!-- Author -->
    <p class="lead">
      by <a href="#">Test</a>
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
import { mapGetters } from 'vuex';
import convertDate from '../../utils/convertDate';

export default {
  name: 'showArticle',
  data() {
    return {
      article: {},
    };
  },
  methods: {
    convertDate,
  },
  watch: {
    $route(to, from) {
      this.article = this.getArticleById(this.$route.params.id);
    },
  },
  computed: {
    ...mapGetters([
      'getArticleById',
    ]),
  },
  mounted() {
    this.article = this.getArticleById(this.$route.params.id);
  },
};
</script>
