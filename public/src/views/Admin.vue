<template>
  <div>
    <admin-nav></admin-nav>
    <admin-list-articles v-if="$route.name === 'admin'"></admin-list-articles>
    <add-article v-if="$route.name === 'add'"></add-article>
  </div>
</template>

<script>
  import AdminNav from './partials/AdminNav'
  import AdminListArticles from './../components/AdminListArticles'
  import AddArticle from './../components/AddArticle';

  export default {
    name: 'admin',
    components: {
      AdminNav,
      AdminListArticles,
      AddArticle
    },
  };
</script>
