var express = require('express');
var router = express.Router();
var Article = require('../models/ArticlesModel');

// ROUTES PUBLIQUES

router.route('/').get((req, res, next) => {
  Article.find((err, articles) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(articles)
  })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    res.json(article);
  })
});

// CRUD

router.route('/create').post((req, res) => {
  Article.create({
    titre: req.body.titre,
    image: req.body.image,
    contenu: req.body.contenu,
    categorie: req.body.categorie,
    auteur: req.body.auteur
  },
  function (error, Article) {
    if (error) {
      res.status(400).send("Impossible de créer l'article");
    }
    res.status(200).json(Article)
  })
});

router.route('/:id').put((req, res) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      article.titre = req.body.titre;
      article.image = req.body.image;
      article.contenu = req.body.contenu;
      article.categorie = req.body.categorie;
      article.auteur = req.body.auteur;
      article.save().then( article => {
        res.json('Article mis à jour');
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.route('/delete/:id').get((req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndRemove(id, (err, abonne) => {
    if (err) {
      return next(new Error('Article non trouvé'));
    } else {
      res.status(400).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
