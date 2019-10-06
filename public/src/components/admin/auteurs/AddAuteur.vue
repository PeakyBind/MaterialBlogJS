<!-- ./src/components/admin/auteurs/AddAuteur.vue -->

<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'un auteur</h1>

      <form method="post">
        <div>
          <label for="pseudo" >Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" v-model="auteur.pseudo"/>
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
  name: 'AddAuteur',
  data() {
    return {
      auteur: {
        pseudo: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'addAuteur',
    ]),
    sendForm() {
      this.addAuteur(this.auteur).then(() => {
        this.$router.push({ name: 'adminListAuteurs' });
      });
    },
  },
};
</script>
