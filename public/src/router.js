import Vue from 'vue';
import Router from 'vue-router';
import setAuthorization from './middlewares/setAuthorisation';
import checkAuthorization from './middlewares/checkAuthorization';
import Home from './views/Home.vue';
import ShowArticle from './views/ShowArticle';
import Login from './views/Login';
import Admin from './views/Admin';

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: checkAuthorization,
      children: [
        {
          path: 'add',
          name: 'add'
        }
      ]
    }
  ],
});

router.beforeEach((to, from, next) => {
  setAuthorization();
  next()
});

export default router;

