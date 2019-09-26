<template>
  <!-- Blog Entries Column -->
  <div class="col-md-8">
    <div class="card-panel">
      <div class="row">
        <form class="col-md-6 col-md-offset-3" action="login/submit" method="post">
          <h5>Connexion to the BackOffice</h5>
          <br>
          <div class="input-field">
            <i class="material-icons prefix">account_circle</i>
            <input v-model="pseudo">
            <label for="pseudo">Pseudo</label>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">error</i>
            <input v-model="password">
            <label for="mdp">Password</label>
          </div>
          <div class="text-center">
            <button @click.prevent="logIn" class="btn btn-info waves-effect waves-light">Connect</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import APIService from '../../APIService';
  const apiService = new APIService();

  export default {
    name: 'LoginPanel',
    data() {
      return {
        pseudo: '',
        password: ''
      }
    },
    methods: {
      logIn() {
        apiService.logIn({pseudo: this.pseudo, password: this.password}).then((data => {
          if (data.user && data.token) {
            sessionStorage.setItem('user', data.user);
            sessionStorage.setItem('jwt', data.token);
            this.$router.push({ name: 'adminHome' })
          }
        }));
      }
    }
  }
</script>
