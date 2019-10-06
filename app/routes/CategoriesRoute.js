// ./app/routes/CategoriesRoute.js

var express = require('express');
var router = express.Router();
var Categorie = require('../models/CategoriesModel');
var checkAuth = require('../middlewares/CheckAuth');


router.route('/').get((req, res, next) => {
  Categorie.find()
    .select('_id nom')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        categories: docs.map(doc => {
          return {
            id: doc._id,
            nom: doc.nom,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/categories/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Categorie.findById(id)
    .select('_id nom')
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        nom: doc.nom
      };
      res.status(200).json(response);
    });
});

// CRUD

router.post('/create', checkAuth, (req, res) => {
  Categorie.create({
      nom: req.body.nom
    },
    function (error, doc) {
      if (error) {
        res.status(400).send("Impossible de créer la catégorie");
      }
      const response = {
        id: doc._id,
        nom: doc.nom
      };
      res.status(200).json(response);
    })
});

router.put('/:id', checkAuth, (req, res) => {
  let id = req.params.id;
  Categorie.findById(id, (err, categorie) => {
    if (err) {
      console.log(err);
    } else {
      categorie.nom = req.body.nom;
      categorie.save().then( categorie => {
        const response = {
          id: categorie._id,
          nom: categorie.nom
        };
        res.status(200).json(response);
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.delete('/:id', checkAuth, (req, res, next) => {
  let id = req.params.id;
  Categorie.findByIdAndRemove(id, (err, categorie) => {
    if (err) {
      return next(new Error('Catégorie non trouvée'));
    } else {
      res.status(200).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
