<template>
  <div>
    <!-- Page Content -->
    <div class="container">

      <div class="row">
        <single-article></single-article>
        <sidebar></sidebar>
      </div>
      <hr>

    </div>

    <foot></foot>

  </div>
</template>

<script>

  import SingleArticle from './../components/singleArticle';
  import Sidebar from './partials/Siderbar';
  import Foot from './partials/Foot';

  export default {
    name: 'showArticle',
    components: {
      SingleArticle,
      Sidebar,
      Foot
    },
  };
</script>
