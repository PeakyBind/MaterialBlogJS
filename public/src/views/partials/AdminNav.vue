<template>
  <div>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Bootstrap theme</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><router-link :to="{ name: 'home' }">Site Public</router-link></li>
            <li><router-link :to="{ name: 'adminHome' }">Dashboard</router-link></li>
            <li><a href="#about">Getting started</a></li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gestion du contenu <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="dropdown-header">Posts</li>
                <li><router-link :to="{ name: 'adminListArticles' }">Liste des articles</router-link></li>
                <li><router-link :to="{ name: 'addArticle' }">Ajouter un article</router-link></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Catégories</li>
                <li><router-link :to="{ name: 'adminListCategories' }">Liste des catégories</router-link></li>
                <li><router-link :to="{ name: 'addCategorie' }">Ajouter une catégorie</router-link></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Auteurs</li>
                <li><router-link :to="{ name: 'adminListAuteurs' }">Liste des auteurs</router-link></li>
                <li><router-link :to="{ name: 'addAuteur' }">Ajouter un auteur</router-link></li>
              </ul>
            </li>

            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <br/>
  </div>
</template>
