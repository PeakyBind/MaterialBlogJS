<!-- ./src/components/admin/articles/EditArticle.vue -->

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
          <input type="text" name="titre" id="titre" v-model="article.titre"/>
        </div>
        <div>
          <label for="texte">Texte</label>
          <textarea name="texte" id="texte" v-model="article.contenu"></textarea>
        </div>

        <!-- MENU DEROULANT DYNAMIQUE -->
        <div>
          <label for="auteur">Auteur</label>
          <select name="auteur" id="auteur" v-model="article.auteur.id">
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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditArticle',
  data() {
    return {
      article: {},
      checkedCategories: [],
      imagePreview: String,
      Form: FormData,
    };
  },
  methods: {
    ...mapActions([
      'editArticle',
    ]),
    uploadImage(event) {
      this.imagePreview = URL.createObjectURL(event.target.files[0]);
      this.Form.append('image', event.target.files[0]);
    },
    sendForm() {
      this.Form.append('id', this.article.id);
      this.Form.append('titre', this.article.titre);
      this.Form.append('contenu', this.article.contenu);
      this.Form.append('auteur', this.article.auteur.id);
      this.Form.append('categories', JSON.stringify(this.checkedCategories));
      console.log(this.Form.get('categories'));
      this.editArticle(this.Form).then(() => {
        this.$router.push({ name: 'adminHome' });
      });
    },
  },
  computed: {
    ...mapState({
      listAuteurs: 'auteurs',
      listCategories: 'categories',
    }),
    ...mapGetters([
      'getArticleById',
    ]),
  },
  created() {
    this.article = this.getArticleById(this.$route.params.id);
  },
  mounted() {
    this.Form = new FormData();
    this.checkedCategories = this.article.categories.map(categorie => categorie.id);
    this.imagePreview = this.article.image;
  },
};
</script>
