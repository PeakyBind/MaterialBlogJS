<!-- ./src/components/admin/auteurs/EditAuteur.vue -->

<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Edition d'un auteur</h1>

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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditAuteur',
  data() {
    return {
      auteur: {},
    };
  },
  methods: {
    ...mapActions([
      'editAuteur',
    ]),
    sendForm() {
      this.editAuteur(this.auteur).then(() => {
        this.$router.push({ name: 'adminListAuteurs' });
      });
    },
  },
  computed: {
    ...mapGetters([
      'getAuteurById',
    ]),
  },
  created() {
    this.auteur = this.getAuteurById(this.$route.params.id);
  },
};
</script>
