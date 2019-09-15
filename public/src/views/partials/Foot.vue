<template>
  <footer class="page-footer info-color darken-1" if="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-md-offset-1">
          <p class="white-text center-on-small-only">SUR NOTRE FACEBOOK</p>
          <p class="white-text center-on-small-only">Bla bla</p>


        </div>
        <hr class="hidden-lg hidden-md">

        <div class="col-md-2">

        </div>
        <hr class="hidden-lg hidden-md">

        <div class="col-md-3 text-center">
          <p class="white-text text-center"> SOCIAL MEDIA</p>
          <a target="_blank" href="https://www.facebook.com/mdbootstrap" class="btn-floating btn-large fb-bg waves-effect waves-light"><i class="fa fa-facebook"> </i></a>
          <a target="_blank" href="https://twitter.com/MDBootstrap" class="btn-floating btn-large tw-bg waves-effect waves-light"><i class="fa fa-twitter"> </i></a>
          <a target="_blank" href="https://plus.google.com/u/0/b/107863090883699620484/107863090883699620484/posts" class="btn-floating btn-large gplus-bg waves-effect waves-light"><i class="fa fa-google-plus"> </i></a>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
        <div class="col-md-10 col-md-offset-1"> © 2016 Copyright <a href="http://www.MDBootstrap.com">MDBootstrap.com </a>
          | <router-link to="/login">Administration</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Foot'
  }
</script>
