<!-- ./src/views/Admin.vue -->

<template>
  <div>
    <admin-nav></admin-nav>
    <div class="container theme-showcase" role="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminNav from './partials/AdminNav';

export default {
  name: 'admin',
  components: {
    AdminNav,
  },
};
</script>
