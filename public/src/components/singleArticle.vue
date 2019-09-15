<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <!-- Blog Post -->

    <!-- Title -->
    <h1>Material Design for Bootstrap</h1>

    <!-- Author -->
    <p class="lead">
      by <a href="#">gnagan</a>
    </p>

    <hr>

    <!-- Date/Time -->
    <p>Posted on
      Thu 02 Feb 2017</p>

    <hr>

    <!-- Preview Image -->
    <img class="img-responsive z-depth-2" src="http://lorempixel.com/750/390/technics/2" alt="">

    <hr>

    <!-- Post Content -->
    <div>Google designed a Material Design to make a web more beautiful. Twitter created a Bootstrap to support you in faster and easier development of responsive websites. Material Design for Bootstrap contains both!</div>


    <hr>
  </div>
</template>

<script>
  import APIService from '../APIService';
  const apiService = new APIService();

  export default {
    name: 'SingleArticle',
    data() {
      return {
        article: {}
      }
    },
    methods: {
      getArticle() {
        apiService.getArticle(this.$route.params.id).then((data) => {
          this.article = data;
        })
      }
    },
    mounted() {
      this.getArticle();
    }
  }
</script>
