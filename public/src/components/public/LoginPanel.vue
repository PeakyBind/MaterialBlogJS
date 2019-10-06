<!-- ./src/components/public/LoginPanel.vue -->

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
            <input id="pseudo" v-model="user.pseudo">
            <label for="pseudo">Pseudo</label>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">error</i>
            <input id="mdp" v-model="user.password">
            <label for="mdp">Password</label>
          </div>
          <div class="text-center">
            <button @click.prevent="connect" class="btn btn-info waves-effect waves-light">Connect</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginPanel',
  data() {
    return {
      user: {
        pseudo: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'logIn',
    ]),
    connect() {
      this.logIn(this.user).then(() => {
        this.$router.push({ name: 'adminHome' });
      });
    },
  },
};
</script>
