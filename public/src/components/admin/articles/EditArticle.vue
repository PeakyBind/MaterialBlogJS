<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Edition d'un post</h1>
      <div>
        <router-link to="admin"></router-link>
      </div>

      <form method="post">
        <div>
          <label for="titre" >Titre</label>
          <input type="text" name="titre" id="titre" v-model="titre"/>
        </div>
        <div>
          <label for="slug">Slug</label>
          <input type="text" name="slug" id="slug" v-model="slug"/>
        </div>
        <div>
          <label for="texte">Texte</label>
          <textarea name="texte" id="texte" v-model="contenu"></textarea>
        </div>

        <!-- MENU DEROULANT DYNAMIQUE -->
        <div>
          <label for="auteur">Auteur</label>
          <select name="auteur" id="auteur" v-model="auteur">
            <option v-for="auteur in listAuteurs" :value="auteur.id">{{ auteur.pseudo }}</option>
          </select>
        </div>
        <!-- FIN MENU DEROULANT DYNAMIQUE -->

        <!-- LISTE DYNAMIQUE DE CHECKBOXES -->
        <div> <label>Catégories</label><br/>
          <div v-for="categorie in listCategories">
            <input
              type="checkbox"

              :id="categorie.nom"
              :value="categorie.id"
              :name="categorie.nom"
              v-model="checkedCategories"
            />
            <label :for="categorie.nom">{{ categorie.nom }}</label>
          </div>
        </div>
        <!-- FIN LISTE DYNAMIQUE DE CHECKBOXES -->

        <div>
          <label for="image">Media</label>
          <input type="file" name="image" id="image" accept="image/*" @change="uploadImage($event)"/>
          <img v-show="(imagePreview !== '')" :src="imagePreview" alt="Your image">
        </div>

        <div><input type="submit" @click.prevent="sendForm"/></div>
      </form>
    </div>
    <!-- /container -->
  </div>
</template>

<script>
  import APIService from "../../../APIService";
  const apiService = new APIService();

  export default {
    name: 'EditArticle',
    data() {
      return {
        titre: String,
        slug: String,
        contenu: String,
        auteur: String,
        article: {},
        listAuteurs: [],
        listCategories: [],
        checkedCategories: [],
        imagePreview: String,
        Form: FormData
      }
    },
    methods: {
      getArticle() {
        apiService.getArticle(this.$route.params.id).then((data) => {
          this.id = data.id;
          this.titre = data.titre;
          this.slug = data.slug;
          this.contenu = data.contenu;
          this.auteur = data.auteur.id;
          this.imagePreview = data.image;
          this.checkedCategories = data.categories.map(categorie => {
            return categorie.id;
          });
        })
      },
      getAuteurs() {
        apiService.getAuteurs().then((data) => {
          this.listAuteurs = data.auteurs;
        });
      },
      getCategories() {
        apiService.getCategories().then((data) => {
          this.listCategories = data.categories;
        });
      },
      uploadImage(event) {
        this.imagePreview = URL.createObjectURL(event.target.files[0]);
        this.Form.append('image', event.target.files[0]);
      },
      sendForm() {
        this.Form.append('titre', this.titre);
        this.Form.append('contenu', this.contenu);
        this.Form.append('auteur', this.auteur);
        this.Form.append('categories', this.checkedCategories);
        apiService.editArticle(this.id, this.Form).then(() => {
          this.$router.push({ name: 'adminHome' });
        });
      }
    },
    mounted() {
      this.Form = new FormData();
      this.getAuteurs();
      this.getCategories();
      this.getArticle();
    }
  }
</script>
