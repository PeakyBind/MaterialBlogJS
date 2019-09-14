let express = require('express');
let router = express.Router();
let Abonne = require('../models/AbonnesModel');

// ROUTES PUBLIQUES

router.route('/').get((req, res, next) => {
  Abonne.find((err, abonnes) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(abonnes)
  })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Abonne.findById(id, (err, abonne) => {
    res.json(abonne);
  })
});

// CRUD

router.route('/create').post((req, res) => {
  Abonne.create({
      email: req.body.email,
      nom: req.body.nom
    },
    function (error, Abonne) {
      if (error) {
        res.status(400).send("Impossible de créer l'abonné");
      }
      res.status(200).json(Abonne)
    })
});

router.route('/:id').put((req, res) => {
  let id = req.params.id;
  Abonne.findById(id, (err, abonne) => {
    if (err) {
      console.log(err);
    } else {
      abonne.email = req.body.email;
      abonne.nom = req.body.nom;
      abonne.save().then( abonne => {
        res.json('Abonné mis à jour');
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.route('/delete/:id').get((req, res, next) => {
  let id = req.params.id;
  Abonne.findByIdAndRemove(id, (err, abonne) => {
    if (err) {
      return next(new Error('Abonné non trouvé'));
    } else {
      res.status(400).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
