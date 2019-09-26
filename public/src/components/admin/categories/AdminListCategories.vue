<template>
  <!-- Main jumbotron for a primary marketing message or call to action -->
  <div class="jumbotron">

    <h1>Gestion des categories</h1>
    <div><router-link :to="{ name: 'addCategorie' }">Ajouter un enregistrement</router-link></div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Id</th>
        <th>Nom</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="categorie in categories">
        <td>{{ categorie.id }}</td>
        <td>{{ categorie.nom }}</td>
        <td>
          <router-link :to="{ name: 'editCategorie', params: { id: categorie.id } }">Editer</router-link> |
          <a href="#" @click.prevent="deleteCategorie(categorie.id)">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import APIService from '../../../APIService';
  const apiService = new APIService();

  export default {
    name: 'AdminListCategories',
    data() {
      return {
        categories: [],
      };
    },
    methods: {
      getCategories() {
        apiService.getCategories().then((data) => {
          this.categories = data.categories;
        });
      },
      deleteCategorie(id) {
        apiService.deleteCategorie(id).then(
          () => {
            let categorieToDelete = this.categories.find((element) => {
              return element.id === id
            });
            let categorieToDeleteId = this.categories.indexOf(categorieToDelete);
            this.categories.splice(categorieToDeleteId, 1);
          }
        );
      }
    },
    mounted() {
      this.getCategories();
    },
  };
</script>
