/*
Ce code permet de configurer la bdd avec Sequelize.
Ce code est le fichier principal pour créer les tables de la base de données avec les informations necessaire. 
*/

const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.utilisateur, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Ces models sont utilisés pour définir les schémas des tables de la base de données.
db.users = require('./user.model.js')(sequelize, Sequelize);
db.articles = require('./article.model.js')(sequelize, Sequelize);
db.commandes = require('./commande.model.js')(sequelize, Sequelize);
db.commandes = require('./contrat.model.js')(sequelize, Sequelize);


module.exports = db;


