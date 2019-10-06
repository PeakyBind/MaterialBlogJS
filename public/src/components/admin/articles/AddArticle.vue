<!-- ./src/components/admin/articles/AddArticle.vue -->

<template>
  <div class="container theme-showcase" role="main">

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">

      <h1>Ajout d'un post</h1>
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
          <select name="auteur" id="auteur" v-model="article.auteur">
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
              v-model="article.checkedCategories"
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AddArticle',
  data() {
    return {
      article: {
        titre: '',
        contenu: '',
        auteur: '',
        checkedCategories: [],
      },

      Form: FormData,
      imagePreview: '',
    };
  },
  methods: {
    ...mapActions([
      'addArticle',
    ]),
    uploadImage(event) {
      this.imagePreview = URL.createObjectURL(event.target.files[0]);
      this.Form.append('image', event.target.files[0]);
    },
    sendForm() {
      this.Form.append('titre', this.article.titre);
      this.Form.append('slug', this.article.slug);
      this.Form.append('contenu', this.article.contenu);
      this.Form.append('auteur', this.article.auteur);
      this.Form.append('categories', JSON.stringify(this.article.checkedCategories));
      this.addArticle(this.Form).then(() => {
        this.$router.push({ name: 'adminHome' });
      });
    },
  },
  computed: mapState({
    listAuteurs: 'auteurs',
    listCategories: 'categories',
  }),
  mounted() {
    this.Form = new FormData();
  },
};
</script>
