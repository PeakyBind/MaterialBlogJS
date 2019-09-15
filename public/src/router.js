import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ShowArticle from './views/ShowArticle';
import Login from './views/Login';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/article/:id',
      name: 'showArticle',
      component: ShowArticle,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
});
