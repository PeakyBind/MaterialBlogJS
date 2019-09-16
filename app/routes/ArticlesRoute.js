var express = require('express');
var router = express.Router();
var Article = require('../models/ArticlesModel');

router.route('/').get((req, res, next) => {
  Article.find()
    .select('_id titre image contenu categorie auteur')
    .populate({ path: 'categorie', select: '_id nom'})
    .populate({ path: 'auteur', select: '_id pseudo'})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        articles: docs.map(doc => {
          return {
            id: doc._id,
            titre: doc.titre,
            image: doc.image,
            contenu: doc.contenu,
            categorie: {
              id: (doc.categorie != null) ? doc.categorie._id : null,
              nom: (doc.categorie != null) ? doc.categorie.nom : null,
            },
            auteur: {
              id: (doc.auteur != null) ? doc.auteur._id : null,
              pseudo: (doc.auteur != null) ? doc.auteur.pseudo : null
            },
            request: {
              type: 'GET',
              url: 'http://localhost:4000/articles/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .select('_id titre image contenu categorie auteur')
    .populate({ path: 'categorie', select: '_id nom'})
    .populate({ path: 'auteur', select: '_id pseudo'})
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        titre: doc.titre,
        image: doc.image,
        contenu: doc.contenu,
        categorie: {
          id: (doc.categorie != null) ? doc.categorie._id : null,
          nom: (doc.categorie != null) ? doc.categorie.nom : null,
        },
        auteur: {
          id: (doc.auteur != null) ? doc.auteur._id : null,
          pseudo: (doc.auteur != null) ? doc.auteur.pseudo : null
        }
      };
      res.status(200).json(response);
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
  function (error, doc) {
    if (error) {
      res.status(400).send("Impossible de créer l'article");
    }
    const response = {
      id: doc._id,
      titre: doc.titre,
      image: doc.image,
      contenu: doc.contenu,
      categorie: {
        id: doc.categorie._id,
        nom: doc.categorie.nom
      },
      auteur: {
        id: doc.auteur._id,
        pseudo: doc.auteur.pseudo
      }
    };
    res.status(200).json(response);
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
