<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Edition d'un auteur</h1>

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
  import APIService from "../../../APIService";
  const apiService = new APIService();

  export default {
    name: 'EditAuteur',
    data() {
      return {
        id: String,
        pseudo: String,
      }
    },
    methods: {
      getAuteur() {
        apiService.getAuteur(this.$route.params.id).then((data) => {
          this.id = data.id;
          this.pseudo = data.pseudo;
        })
      },
      sendForm() {
        apiService.editAuteur(this.id, { pseudo: this.pseudo }).then(() => {
          this.$router.push({ name: 'adminListAuteurs' });
        });
      }
    },
    mounted() {
      this.getAuteur();
    }
  }
</script>
