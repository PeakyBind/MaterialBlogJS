<!-- ./src/components/admin/categories/AddCategorie.vue -->

<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'une catégorie</h1>

      <form method="post">
        <div>
          <label for="nom" >Nom</label>
          <input type="text" name="nom" id="nom" v-model="categorie.nom"/>
        </div>
        <div><input type="submit" @click.prevent="sendForm"/></div>
      </form>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddArticle',
  data() {
    return {
      categorie: {
        nom: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'addCategorie',
    ]),
    sendForm() {
      this.addCategorie(this.categorie).then(() => {
        this.$router.push({ name: 'adminListCategories' });
      });
    },
  },
};
</script>
