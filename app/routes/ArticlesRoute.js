// ./app/routes/ArticlesRoute.js

var express = require('express');
var router = express.Router();
var Article = require('../models/ArticlesModel');
var multer = require('multer');
var checkAuth = require('../middlewares/CheckAuth');
var slugify = require('../utils/slugify');

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
    .select('_id titre image contenu categories auteur createdAt updatedAt')
    .populate({ path: 'categories', select: '_id nom'})
    .populate({ path: 'auteur', select: '_id pseudo'})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        articles: docs.map(doc => {
          return {
            id: doc._id,
            titre: doc.titre,
            slug: slugify(doc.titre),
            image: doc.image,
            contenu: doc.contenu,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            categories: doc.categories.map(categorie => {
              return {
                id: categorie._id,
                nom: categorie.nom,
              }
            }),
            auteur: {
              id: doc.auteur._id,
              pseudo: doc.auteur.pseudo
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
    .select('_id titre image contenu categories auteur createdAt updatedAt')
    .populate({ path: 'categories', select: '_id nom'})
    .populate({ path: 'auteur', select: '_id pseudo'})
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        titre: doc.titre,
        slug: slugify(doc.titre),
        image: doc.image,
        contenu: doc.contenu,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        categories: doc.categories.map(categorie => {
          return {
            id: categorie._id,
            nom: categorie.nom,
          }
        }),
        auteur: {
          id: doc.auteur._id,
          pseudo: doc.auteur.pseudo
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
    categories: JSON.parse(req.body.categories),
    auteur: req.body.auteur
  },
  function (error, doc) {
    if (error) {
      res.status(400).send("Impossible de créer l'article");
    }
    const response = {
      id: doc._id,
      titre: doc.titre,
      slug: slugify(doc.titre),
      image: doc.image,
      contenu: doc.contenu,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      categories: doc.categories.map(categorie => {
        return {
          id: categorie._id,
        }
      }),
      auteur: {
        id: doc.auteur._id,
      }
    };
    res.status(200).json(response);
  })
});

router.put('/:id', checkAuth, upload.single('image'), (req, res) => {
  let id = req.params.id;
  Article.findById(id,(err, article) => {
    if (err) {
      console.log(err);
    } else {
      article.titre = req.body.titre;
      if (req.file !== undefined) article.image = 'http://localhost:4000/' + req.file.destination + req.file.filename;
      article.contenu = req.body.contenu;
      article.categories = JSON.parse(req.body.categories);
      article.auteur = req.body.auteur;
      article.save().then(() => {
        const response = {
          id: article._id,
          titre: article.titre,
          slug: slugify(article.titre),
          image: article.image,
          contenu: article.contenu,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          categories: article.categories.map(categorie => {
            return {
              id: categorie._id,
            }
          }),
          auteur: {
            id: article.auteur._id,
          }
        };
        res.status(200).json(response);
      }).catch(err => {
        res.status(400).send(err);
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
