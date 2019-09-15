let express = require('express');
let router = express.Router();
let Auteur = require('../models/AuteursModel');

// ROUTES PUBLIQUES

router.route('/').get((req, res, next) => {
  Auteur.find((err, auteurs) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(auteurs)
  })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Auteur.findById(id, (err, auteur) => {
    res.json(auteur);
  })
});

// CRUD

router.route('/create').post((req, res) => {
  Auteur.create({
      pseudo: req.body.pseudo
    },
    function (error, auteur) {
      if (error) {
        res.status(400).send("Impossible de créer l'auteur");
      }
      res.status(200).json(auteur)
    })
});

router.route('/:id').put((req, res) => {
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

router.route('/delete/:id').get((req, res, next) => {
  let id = req.params.id;
  Auteur.findByIdAndRemove(id, (err, auteur) => {
    if (err) {
      return next(new Error('Auteur non trouvé'));
    } else {
      res.status(400).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
