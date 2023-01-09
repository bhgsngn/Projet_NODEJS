//Le modèle de base de données "article" a des champs de Nom_article, de Prix et d'identifiant article.


module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define('article', {
    Nom_article: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Prix: {
      type: Sequelize.INT,
      allowNull: false
    },
    articleId: {
      type: Sequelize.INT,
      primaryKey: true
    },
  });

  return Article;
};


