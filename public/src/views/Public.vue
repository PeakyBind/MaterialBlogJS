<template>
  <div>
    <default-nav></default-nav>

    <!-- Page Content -->
    <div class="container">

      <div class="row">
        <router-view></router-view>
        <sidebar></sidebar>
      </div>
      <hr>

    </div>

  <foot></foot>

  </div>
</template>

<script>

import ListArticles from '../components/public/ListArticles';
import Sidebar from './partials/Siderbar';
import Foot from './partials/Foot';
import DefaultNav from './partials/DefaultNav';

export default {
  name: 'public',
  components: {
    ListArticles,
    Sidebar,
    Foot,
    DefaultNav
  },
};
</script>
