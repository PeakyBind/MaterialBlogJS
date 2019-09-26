var express = require('express');
var router = express.Router();
var Article = require('../models/ArticlesModel');
var multer = require('multer');
var checkAuth = require('../middlewares/CheckAuth');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

var fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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

router.post('/create', checkAuth, upload.single('image'), (req, res) => {
  Article.create({
    titre: req.body.titre,
    image: 'http://localhost:4000/' + req.file.destination + req.file.filename,
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
      },
      auteur: {
        id: doc.auteur._id,
      }
    };
    res.status(200).json(response);
  })
});

router.put('/:id', checkAuth, (req, res) => {
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

router.delete('/:id', checkAuth, (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndRemove(id, (err, article) => {
    if (err) {
      return next(new Error('Article non trouvé'));
    } else {
      res.status(200).json('Supprimé avec succès');
    }
  })
});

module.exports = router;
