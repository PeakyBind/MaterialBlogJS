<template>
  <div>
    <div class="container">
      <div class="row">
        <login-panel></login-panel>
        <sidebar></sidebar>
        <hr>
      </div>
    </div>
    <foot></foot>
  </div>
</template>


<script>
  import Sidebar from "./partials/Siderbar";
  import Foot from "./partials/Foot";
  import LoginPanel from "./../components/LoginPanel";
  export default {
    components: {
      Sidebar,
      Foot,
      LoginPanel
    }
  }
</script>
