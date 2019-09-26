<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'un auteur</h1>

      <form method="post">
        <div>
          <label for="pseudo" >Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" v-model="pseudo"/>
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
    name: 'AddAuteur',
    data() {
      return {
        pseudo: ''
      };
    },
    methods: {
      sendForm() {
        let form = {
          pseudo: this.pseudo
        };
        apiService.addAuteur(form).then(() => {
          this.$router.push({ name: 'adminListAuteurs' });
        });

      },
    },
  };
</script>
