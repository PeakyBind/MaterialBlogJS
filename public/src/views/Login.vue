<template>
  <div>
    <default-nav></default-nav>
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
  import DefaultNav from './partials/DefaultNav';
  import LoginPanel from "./../components/LoginPanel";
  export default {
    components: {
      Sidebar,
      Foot,
      LoginPanel,
      DefaultNav
    }
  }
</script>
