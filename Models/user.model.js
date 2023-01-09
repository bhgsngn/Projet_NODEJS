module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    usernom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      primaryKey: true
    },
  });

  return User;
};
//// Le modèle de base de données "Utilisateur" a des champs de nom d'utilisateur, de mot de passe et de jeton, qui sont tous des chaînes de caractères.
