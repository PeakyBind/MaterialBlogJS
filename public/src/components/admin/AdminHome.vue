<!-- ./src/components/admin//AdminHome.vue -->


<template>
  <div>
    <admin-list-articles></admin-list-articles>
    <admin-list-categories></admin-list-categories>
    <admin-list-auteurs></admin-list-auteurs>
  </div>
</template>

<script>
import AdminListArticles from './articles/AdminListArticles';
import AdminListCategories from './categories/AdminListCategories';
import AdminListAuteurs from './auteurs/AdminListAuteurs';

export default {
  name: 'adminHome',
  data() {
    return {
      articles: [],
    };
  },
  components: {
    AdminListAuteurs,
    AdminListCategories,
    AdminListArticles,
  },
};
</script>
