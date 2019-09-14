let express = require('express');
let router = express.Router();
let Newsletter = require('../schemas/Newsletter');

router.route('/create').post((req, res) => {
  Newsletter.create({
      datePublication: req.body.datePublication,
      contenu: req.body.contenu
    },
    function (error, newsletter) {
      if (error) {
        res.status(400).send("Impossible de créer la catégorie");
      }
      res.status(200).json(newsletter)
    })
});

router.route('/').get((req, res, next) => {
  Newsletter.find((err, newsletters) => {
    if (err) {
      return next(new Error(err));
    }
    res.json(newsletters)
  })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Newsletter.findById(id, (err, newsletter) => {
    res.json(newsletter);
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
