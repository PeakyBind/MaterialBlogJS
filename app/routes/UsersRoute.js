var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwtUtils = require('./../utils/jwt.utils');
var User = require('./../models/UsersModel');


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
          }, (err, user) => {
            if (err) {
              res.status(400).send("Impossible de créer l'utilisateur");
            }
            res.status(200).json(user);
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
            return res.status(200).json({
              'user': user,
              'token': jwtUtils.generateTokenForUsers(user)
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

module.exports = router;
