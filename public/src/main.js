// ./src/main.js

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
