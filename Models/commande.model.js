
module.exports = (sequelize, Sequelize) => {
  const Commande = sequelize.define('commande', {
    id_commande: {
      type: Sequelize.STRING,
    },
    Date_commande: {
      type: Sequelize.DATE,
    },
    commandepar: {
      type: Sequelize.STRING,
    },
  });

  return Commande;
};

