<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'une catégorie</h1>

      <form method="post">
        <div>
          <label for="nom" >Nom</label>
          <input type="text" name="nom" id="nom" v-model="nom"/>
        </div>
        <div><input type="submit" @click.prevent="sendForm"/></div>
      </form>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  import APIService from '../../../APIService';
  const apiService = new APIService();

  export default {
    name: 'AddArticle',
    data() {
      return {
        nom: '',
      };
    },
    methods: {
      sendForm() {
        let form = {
          nom: this.nom
        };
        apiService.addCategorie(form).then(() => {
          this.$router.push({ name: 'adminListCategories' });
        });

      },
    },
  };
</script>
