<!-- ./src/App.vue -->

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'getArticles',
      'getCategories',
      'getAuteurs',
    ]),
  },
  mounted() {
    this.getArticles();
    this.getCategories();
    this.getAuteurs();
  },
};
</script>
