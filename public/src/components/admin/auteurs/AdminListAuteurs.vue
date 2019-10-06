<!-- ./src/components/admin/auteurs/AdminListAuteurs.vue -->

<template>
  <!-- Main jumbotron for a primary marketing message or call to action -->
  <div class="jumbotron">

    <h1>Gestion des auteurs</h1>
    <div><router-link :to="{ name: 'addAuteur' }">Ajouter un enregistrement</router-link></div>

    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Id</th>
        <th>Pseudo</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="auteur in auteurs">
        <td>{{ auteur.id }}</td>
        <td>{{ auteur.pseudo }}</td>
        <td>
          <router-link :to="{ name: 'editAuteur', params: { id: auteur.id } }">Editer</router-link> |
          <a href="#" @click.prevent="deleteAuteur(auteur.id)">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminListAuteurs',
  methods: {
    ...mapActions([
      'deleteAuteur',
    ]),
  },
  computed: mapState([
    'auteurs',
  ]),
};
</script>
