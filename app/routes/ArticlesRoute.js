var express = require('express');
var router = express.Router();
var Article = require('../models/ArticlesModel');
var Categorie = require('../models/CategoriesModel');
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
            categories: (doc.categories !== null) ? doc.categories.map(categorie => {
              return {
                id: (categorie != null) ? categorie._id : null,
                nom: (categorie != null) ? categorie.nom : null,
              }
            }) : null,
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
        categories: (doc.categories.length > 0) ? doc.categories.map(categorie => {
          return {
            id: (categorie != null) ? categorie._id : null,
            nom: (categorie != null) ? categorie.nom : null,
          }
        }) : null,
        auteur: {
          id: (doc.auteur != null) ? doc.auteur._id : null,
          pseudo: (doc.auteur != null) ? doc.auteur.pseudo : null
        }
      };
      res.status(200).json(response);
    })
});

router.route('/categorie/:id').get((req, res) => {
  let categorieId = req.params.id;
  Categorie.find({ _id: categorieId })
    .select('_id nom')
    .populate({
      path: 'articles',
      select: '_id titre image contenu auteur createdAt updatedAt',
      populate: { path: 'auteur', select: '_id pseudo'}
    })
    .exec()
    .then(doc => {
      const response = {
        articles: doc[0].articles.map(article => {
          return {
            id: article._id,
            titre: article.titre,
            slug: slugify(article.titre),
            image: article.image,
            contenu: article.contenu,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            auteur: {
              id: (article.auteur != null) ? article.auteur._id : null,
              pseudo: (article.auteur != null) ? article.auteur.pseudo : null
            }
          }
        })
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
    categories: req.body.categories,
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
      categories: (doc.categories.length > 0) ? doc.categories.map(categorie => {
        return {
          id: categorie._id,
        }
      }) : null,
      auteur: {
        id: doc.auteur._id,
      }
    };
    if (doc.categories.length > 0) {
      for(categ of doc.categories) {
        Categorie.findById(categ, (err, categorie) => {
          if (err) {
            console.log(err)
          } else {
            categorie.articles.push(doc._id);
            categorie.save();
          }
        })
      }
    }
    res.status(200).json(response);
  })
});

router.put('/:id', checkAuth, upload.single('image'), (req, res) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      article.titre = req.body.titre;
      if (req.file !== undefined) article.image = 'http://localhost:4000/' + req.file.destination + req.file.filename;
      article.contenu = req.body.contenu;
      article.categories = req.body.categories;
      article.auteur = req.body.auteur;
      article.save().then( article => {
        if (article.categories.length > 0) {
          for(categ of article.categories) {
            Categorie.findById(categ, (err, categorie) => {
              if (err) {
                console.log(err)
              } else {
                categorie.articles.push(article._id);
                categorie.save();
              }
            })
          }
        }
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
