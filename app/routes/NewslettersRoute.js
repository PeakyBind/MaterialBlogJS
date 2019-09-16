let express = require('express');
let router = express.Router();
let Newsletter = require('../models/NewslettersModel');

router.route('/').get((req, res, next) => {
  Newsletter.find()
    .select('_id datePublication contenu')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        newsletters: docs.map(doc => {
          return {
            id: doc._id,
            datePublication: doc.datePublication,
            contenu: doc.contenu,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/newsletters/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Newsletter.findById(id)
    .select('_id datePublication contenu')
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        datePublication: doc.datePublication,
        contenu: doc.contenu
      };
      res.status(200).json(response);
    });
});

// CRUD

router.route('/create').post((req, res) => {
  Newsletter.create({
      datePublication: req.body.datePublication,
      contenu: req.body.contenu
    },
    function (error, doc) {
      if (error) {
        res.status(400).send("Impossible de créer la catégorie");
      }
      const response = {
        id: doc._id,
        datePublication: doc.datePublication,
        contenu: doc.contenu
      };
      res.status(200).json(response);
    })
});

router.route('/:id').put((req, res) => {
  let id = req.params.id;
  Newsletter.findById(id, (err, newsletter) => {
    if (err) {
      console.log(err);
    } else {
      newsletter.datePublication = req.body.datePublication;
      newsletter.contenu = req.body.contenu;
      newsletter.save().then( newsletter => {
        res.json('Newsletter mise à jour');
      }).catch(err => {
        res.status(400).send('Erreur lors de l\'enregistrement');
      })
    }
  })
});

router.route('/delete/:id').get((req, res, next) => {
  let id = req.params.id;
  Newsletter.findByIdAndRemove(id, (err, newsletter) => {
    if (err) {
      return next(new Error('Newsletter non trouvée'));
    } else {
      res.status(400).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
