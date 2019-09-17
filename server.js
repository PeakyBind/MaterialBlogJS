var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
  dotenv = require('dotenv');
  routes = require('./app/Router');

dotenv.config();

mongoose.connect(
  process.env.MONGO_DB,
  {useNewUrlParser: true}
  ).then(
  () => {console.log("La connexion à la base de données a bien été établie.")},
  err => {console.log("Erreur lors de la connexion à la base de données")}
);

// Détection des erreurs après que la connexion initiale à la base de données soit établie.
mongoose.connection.on('error', err => {
  console.log(err);
});

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/abonnes', routes[0]);
app.use('/articles', routes[1]);
app.use('/newsletters', routes[2]);
app.use('/auteurs', routes[3]);
app.use('/categories', routes[4]);
app.use('/users', routes[5]);

var port = process.env.APP_PORT || 4000;

app.listen(port);
console.log("Ecoute sur le port " . port);
