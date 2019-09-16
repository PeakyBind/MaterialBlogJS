let express = require('express');
let router = express.Router();
let Abonne = require('../models/AbonnesModel');

// ROUTES PUBLIQUES

router.route('/').get((req, res, next) => {
  Abonne.find()
    .select('email nom _id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        abonnes: docs.map(doc => {
          return {
            id: doc._id,
            email: doc.email,
            nom: doc.nom,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/abonnes/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Abonne.findById(id)
    .select('email nom _id')
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        email: doc.email,
        nom: doc.nom
      };
      res.status(200).json(response);
    });
});

// CRUD

router.route('/create').post((req, res) => {
  Abonne.create({
      email: req.body.email,
      nom: req.body.nom
    },
    function (error, doc) {
      if (error) {
        res.status(400).send("Impossible de créer l'abonné");
      }
      const response = {
        id: doc._id,
        email: doc.email,
        nom: doc.nom
      };
      res.status(200).json(response);
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
