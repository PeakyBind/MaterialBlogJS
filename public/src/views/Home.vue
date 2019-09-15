<template>
  <div>
    <!-- Page Content -->
    <div class="container">

      <div class="row">
        <list-articles></list-articles>
        <sidebar></sidebar>
      </div>
      <hr>

    </div>

  <foot></foot>

  </div>
</template>

<script>

import ListArticles from './../components/ListArticles';
import Sidebar from './partials/Siderbar';
import Foot from './partials/Foot';

export default {
  name: 'home',
  components: {
    ListArticles,
    Sidebar,
    Foot
  },
};
</script>
