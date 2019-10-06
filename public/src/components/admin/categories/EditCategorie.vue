<!-- ./src/components/admin/categories/EditCategorie.vue -->

<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Edition d'une catégorie</h1>

      <form method="post">
        <div>
          <label for="nom" >Titre</label>
          <input type="text" name="nom" id="nom" v-model="categorie.nom"/>
        </div>
        <div><input type="submit" @click.prevent="sendForm"/></div>
      </form>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditCategorie',
  data() {
    return {
      categorie: {},
    };
  },
  methods: {
    ...mapActions([
      'editCategorie',
    ]),
    sendForm() {
      this.editCategorie(this.categorie).then(() => {
        this.$router.push({ name: 'adminListCategories' });
      });
    },
  },
  computed: {
    ...mapGetters([
      'getCategorieById',
    ]),
  },
  created() {
    this.categorie = this.getCategorieById(this.$route.params.id);
  },
};
</script>
