<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Edition d'une catégorie</h1>

      <form method="post">
        <div>
          <label for="nom" >Titre</label>
          <input type="text" name="nom" id="nom" v-model="nom"/>
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
    name: 'EditCategorie',
    data() {
      return {
        id: String,
        nom: String,
      }
    },
    methods: {
      getCategorie() {
        apiService.getCategorie(this.$route.params.id).then((data) => {
          this.id = data.id;
          this.nom = data.nom;
        })
      },
      sendForm() {
        apiService.editCategorie(this.id, { nom: this.nom }).then(() => {
          this.$router.push({ name: 'adminListCategories' });
        });
      }
    },
    mounted() {
      this.getCategorie();
    }
  }
</script>
