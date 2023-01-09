//Le modèle de base de données "Contrat" a des champs de Num,description Contrat.

module.exports = (sequelize, Sequelize) => {
  const Contrat = sequelize.define('contrat', {
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    num: {
      type: Sequelize.INT,
      primaryKey: true
    },
  });

  return Contact;
};
