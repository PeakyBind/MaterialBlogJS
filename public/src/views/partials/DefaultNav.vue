<template>
  <!-- Navigation -->
  <nav class="navbar z-depth-2 info-color">
    <div class="container ">
      <div class="navbar-header">
        <router-link class="navbar-brand waves-effect waves-light" to="/">Mon Super Blog</router-link>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form action="posts/search" method="get" class="navbar-form navbar-right waves-effect waves-light" role="search">
          <div class="form-group">
            <input type="text" name="search" class="form-control" placeholder="Search">
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'defaultNav'
  }
</script>
