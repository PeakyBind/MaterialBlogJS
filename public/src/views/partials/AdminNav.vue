<template>
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
          <li><a href="http://localhost:8888/LAB_2018_2019/public/www/" target="_blank">Site public</a></li>
          <li class="active"><a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/">Dashboard</a></li>
          <li><a href="#about">Getting started</a></li>

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Gestion du contenu <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Posts</li>
              <li><a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/posts">Liste des posts</a></li>
              <li><a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/posts/add">Ajouter un post</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">Catégories</li>
              <li><a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/categories">Liste des catégories</a></li>
              <li><a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/categories/add">Ajouter une catégorie</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">Auteurs</li>
              <li><a href="#">Liste des auteurs</a></li>
              <li><a href="#">Ajouter un auteur</a></li>
            </ul>
          </li>

          <li><a href="#contact">Contact</a></li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>
