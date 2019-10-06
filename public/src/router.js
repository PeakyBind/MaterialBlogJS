// ./src/routeur.js

import Vue from 'vue';
import Router from 'vue-router';
import setAuthorization from './middlewares/setAuthorisation';
import checkAuthorization from './middlewares/checkAuthorization';
import redirectIfLogged from './middlewares/redirectIfLogged';
import Public from './views/Public.vue';
import ShowArticle from './components/public/showArticle';
import ShowCategorie from './components/public/ShowCategorie';
import Admin from './views/Admin';
import AddArticle from './components/admin/articles/AddArticle';
import AdminHome from './components/admin/AdminHome';
import EditArticle from './components/admin/articles/EditArticle';
import ListArticles from './components/public/ListArticles';
import LoginPanel from './components/public/LoginPanel';
import AdminListArticles from './components/admin/articles/AdminListArticles';
import AdminListCategories from './components/admin/categories/AdminListCategories';
import AddCategorie from './components/admin/categories/AddCategorie';
import EditCategorie from './components/admin/categories/EditCategorie';
import AdminListAuteurs from './components/admin/auteurs/AdminListAuteurs';
import AddAuteur from './components/admin/auteurs/AddAuteur';
import EditAuteur from './components/admin/auteurs/EditAuteur';
import AdminPosts from './components/routeurs/AdminPosts';
import AdminCategories from './components/routeurs/AdminCategories';
import AdminAuteurs from './components/routeurs/AdminAuteurs';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Public,
      children: [
        {
          path: '',
          name: 'home',
          component: ListArticles,
        },
        {
          path: 'article/:id',
          name: 'showArticle',
          component: ShowArticle,
        },
        {
          path: 'categories/:id',
          name: 'showCategorie',
          component: ShowCategorie,
        },
        {
          path: 'login',
          name: 'login',
          beforeEnter: redirectIfLogged,
          component: LoginPanel,
        },
      ],
    },
    {
      path: '/admin',
      component: Admin,
      beforeEnter: checkAuthorization,
      children: [
        {
          path: '',
          name: 'adminHome',
          component: AdminHome,
        },
        {
          path: 'posts',
          component: AdminPosts,
          children: [
            {
              path: '',
              name: 'adminListArticles',
              component: AdminListArticles,
            },
            {
              path: 'add',
              name: 'addArticle',
              component: AddArticle,
            },
            {
              path: 'edit/:id',
              name: 'editArticle',
              component: EditArticle,
            },
          ],
        },
        {
          path: 'categories',
          component: AdminCategories,
          children: [
            {
              path: '',
              name: 'adminListCategories',
              component: AdminListCategories,
            },
            {
              path: 'add',
              name: 'addCategorie',
              component: AddCategorie,
            },
            {
              path: 'edit/:id',
              name: 'editCategorie',
              component: EditCategorie,
            },
          ],
        },
        {
          path: 'auteurs',
          component: AdminAuteurs,
          children: [
            {
              path: '',
              name: 'adminListAuteurs',
              component: AdminListAuteurs,
            },
            {
              path: 'add',
              name: 'addAuteur',
              component: AddAuteur,
            },
            {
              path: 'edit/:id',
              name: 'editAuteur',
              component: EditAuteur,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  setAuthorization();
  next();
});

export default router;
