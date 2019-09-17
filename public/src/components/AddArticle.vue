<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'un post</h1>
      <div>
        <a href="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/posts">
          Retour vers la liste des posts
        </a>
      </div>

      <form action="http://localhost:8888/LAB_2018_2019/backoffice_MVC/backoffice/www/posts/add/insert" method="post">
        <div>
          <label for="titre">Titre</label>
          <input type="text" name="titre" id="titre" />
        </div>
        <div>
          <label for="slug">Slug</label>
          <input type="text" name="slug" id="slug" />
        </div>
        <div>
          <label for="texte">Texte</label>
          <textarea name="texte" id="texte"></textarea>
        </div>

        <!-- MENU DEROULANT DYNAMIQUE -->
        <div>
          <label for="auteur">Auteur</label>
          <select name="auteur" id="auteur">
            <option value="2">
              ben        </option>
            <option value="1">
              pascal        </option>
          </select>
        </div>
        <!-- FIN MENU DEROULANT DYNAMIQUE -->

        <!-- LISTE DYNAMIQUE DE CHECKBOXES -->
        <div> <label>Catégories</label><br/>
          <input type="checkbox" name="bidon" id="bidon" />
          <label for="bidon">Bidon</label><br/>
          <input type="checkbox" name="design-web" id="design-web" />
          <label for="design-web">Design web</label><br/>
          <input type="checkbox" name="developpement-backend" id="developpement-backend" />
          <label for="developpement-backend">Développement backend</label><br/>
          <input type="checkbox" name="developpement-frontend" id="developpement-frontend" />
          <label for="developpement-frontend">Développement frontend</label><br/>
        </div>
        <!-- FIN LISTE DYNAMIQUE DE CHECKBOXES -->

        <div>
          <label for="media">Media</label>
          <input type="file" name="media" id="media" />
        </div>

        <div><input type="submit" /></div>
      </form>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  export default {
    name: 'AddArticle'
  }
</script>
