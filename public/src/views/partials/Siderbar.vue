<!-- ./src/views/partials/Sidebar.vue -->

<template>
  <!-- Blog Sidebar Widgets Column -->
  <div class="col-md-4">
    <div class="sidebar">
      <!-- Blog Search Well -->
      <h4>Categories</h4>

      <ul class="collection">

        <li v-for="categorie in categories">
          <router-link :to="{ name: 'showCategorie', params: { id: categorie.id} }">{{ categorie.nom }}</router-link>
        </li>

      </ul>
      <br/>
      <!-- Subscription widget -->
      <div class="card-panel">
        <div class="row">
          <form class="col-md-12">
            <h5>Subscribe to our newsletter</h5>
            <h6>Once a week we will send you a summary of the most useful news</h6>
            <br>
            <div class="input-field">
              <i class="material-icons prefix">account_circle</i>
              <input id="icon_prefix" type="text" class="validate">
              <label for="icon_prefix">Your Name</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">mail</i>
              <input id="icon_telephone" type="tel" class="validate">
              <label for="icon_telephone">Your Email</label>
            </div>
          </form>
          <div class="text-center">
            <button type="button" class="btn btn-info waves-effect waves-light">Subscribe</button>
          </div>
        </div>
      </div>
      <!--/.Subscription widget -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  computed: mapState([
    'categories',
  ]),
};
</script>
