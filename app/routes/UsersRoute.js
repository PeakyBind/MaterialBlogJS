var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwtUtils = require('./../utils/jwt.utils');
var User = require('./../models/UsersModel');

router.route('/').get((req, res, next) => {
  User.find()
    .select('_id email pseudo password')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            id: doc._id,
            email: doc.email,
            pseudo: doc.pseudo,
            password: doc.password,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/users/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  User.findById(id)
    .select('_id email pseudo password')
    .exec()
    .then(doc => {
      const response = {
        id: doc._id,
        email: doc.email,
        pseudo: doc.pseudo,
        password: doc.password
      };
      res.status(200).json(response);
    });
});


router.route('/register').post((req, res) => {

  // Paramètres
  var email = req.body.email;
  var pseudo = req.body.pseudo;
  var password = req.body.password;

  if (email == null || pseudo == null || password == null) {
    return res.status(400).json({ 'error': 'Paramètres manquants'});
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(new Error(err));
    } else {
      if (!user) {
        bcrypt.hash(password, 5, (err, bcryptedPassword) => {
          User.create({
            email: email,
            pseudo: pseudo,
            password: bcryptedPassword
          }, (err, doc) => {
            if (err) {
              res.status(400).send("Impossible de créer l'utilisateur");
            }
            const response = {
              id: doc._id,
              email: doc.email,
              pseudo: doc.pseudo,
              password: doc.password
            };
            res.status(200).json(response);
          })
        })
      } else {
        return res.status(409).json("L'utilisateur existe déjà");
      }
    }
  })
});

router.route('/login').post((req, res) => {
  var pseudo = req.body.pseudo;
  var password = req.body.password;

  if (pseudo == null || password == null) {
    return res.status(400).json({ 'error': 'Paramètres manquants'});
  }

  User.findOne({ pseudo: pseudo }, (err, user) => {
    if (err) {
      return next(new Error(err));
    } else {
      if (user) {
        bcrypt.compare(password, user.password, (errByCrypt, resByCrypt) => {
          if (resByCrypt) {
            var token = jwtUtils.generateTokenForUsers(user);
            res.setHeader('Authorization', 'Bearer ' + token);
            return res.status(200).json({
              'user': user._id,
              'token': token
            })
          } else {
            return res.status(403).json("Erreur: Mot de passe non-valide")
          }
        })
      } else {
        return res.status(409).json("L'utilisateur n'existe pas");
      }
    }
  })
});

router.route('/admin').get((req, res) => {
  var headerAuth = req.headers['authorization'];
  var userId = jwtUtils.getUserId(headerAuth);

  if (userId == '') {
    return res.status(400).json({"Erreur": "Mauvais Token"});
  }
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      return res.status(200).json(err)
    }
    return res.status(200).json(user.password);
  });
});

module.exports = router;
