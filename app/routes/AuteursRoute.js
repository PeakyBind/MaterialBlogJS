var express = require('express');
var router = express.Router();
var Auteur = require('../models/AuteursModel');
var checkAuth = require('../middlewares/CheckAuth');

router.route('/').get((req, res, next) => {
  Auteur.find()
    .select('_id pseudo')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        auteurs: docs.map(doc => {
          return {
            id: doc._id,
            pseudo: doc.pseudo,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/auteurs/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Auteur.findById(id)
    .select('_id pseudo')
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        pseudo: doc.pseudo
      };
      res.status(200).json(response);
    });
});

// CRUD

router.post('/create', checkAuth, (req, res) => {
  Auteur.create({
      pseudo: req.body.pseudo
    },
    function (error, doc) {
      if (error) {
        res.status(400).send("Impossible de créer l'auteur");
      }
      const response = {
        id: doc._id,
        pseudo: doc.pseudo
      };
      res.status(200).json(response);
    })
});

router.put('/:id', checkAuth, (req, res) => {
  let id = req.params.id;
  Auteur.findById(id, (err, auteur) => {
    if (err) {
      console.log(err);
    } else {
      auteur.pseudo = req.body.pseudo;
      auteur.save().then( auteur => {
        res.json('Auteur mis à jour');
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.delete('/:id', checkAuth, (req, res, next) => {
  let id = req.params.id;
  Auteur.findByIdAndRemove(id, (err, auteur) => {
    if (err) {
      return next(new Error('Auteur non trouvé'));
    } else {
      res.status(200).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
