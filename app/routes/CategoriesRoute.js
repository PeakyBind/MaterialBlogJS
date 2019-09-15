let express = require('express');
let router = express.Router();
let Categorie = require('../models/CategoriesModel');

// ROUTES PUBLIQUES

router.route('/').get((req, res, next) => {
  Categorie.find((err, categories) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(categories)
  })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Categorie.findById(id, (err, categorie) => {
    res.json(categorie);
  })
});

// CRUD

router.route('/create').post((req, res) => {
  Categorie.create({
      nom: req.body.nom
    },
    function (error, categorie) {
      if (error) {
        res.status(400).send("Impossible de créer la catégorie");
      }
      res.status(200).json(categorie)
    })
});

router.route('/:id').put((req, res) => {
  let id = req.params.id;
  Categorie.findById(id, (err, categorie) => {
    if (err) {
      console.log(err);
    } else {
      categorie.nom = req.body.nom;
      categorie.save().then( categorie => {
        res.json('Catégorie mise à jour');
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.route('/delete/:id').get((req, res, next) => {
  let id = req.params.id;
  Categorie.findByIdAndRemove(id, (err, categorie) => {
    if (err) {
      return next(new Error('Catégorie non trouvée'));
    } else {
      res.status(400).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
