import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let vm = new Vue({
  router,
  render(h) { return h(App); },
}).$mount('#app');
