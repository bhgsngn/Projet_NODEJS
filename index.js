//Ce code met en place un serveur Express.js et le connecte à une base de données en utilisant Sequelize.

// on a utilisé express pour la création du serveur, cors pour la suppression des erreurs et morgan pour gerer les log
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// ce code implique la configuration de  BDD et des routes pour l'utilisateur , le commande et article
const db = require('./models/index');
const Article = require('./routes/article.route');
const user = require('./routes/user.route');
const commande = require('./routes/commande.route');
const contrat = require('./routes/contrat.route');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mise en place du middleware
app.use(cors());
app.use(morgan('tiny'));
app.use('/Article', Article);
app.use('/User', user);
app.use('/commande', commande);
app.use('/contrat', contrat);

//Synchroniser les modèles de BDD et genere un message en cas  d'échec
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

//lancer le serveur et écoutez les requêtes entrantes sur le port 3000
app.listen(3000, () => {
  console.log('Server Listening on port 3000');
});

// Exporter l'objet d'application pour l'utiliser par la suite dans les autres parties de l'application
module.exports = app;



