//on recupere tous les models nécessaire

const express = require('express');
const router = express.Router();
const db = require('../models/index');

//configuration du model article

const Article = db.articles;
const Op = db.Sequelize.Op;

//Ce route permet l'envoi des données et  l'enrengistrement de l' article 
router.post('/', async function (req, res) {
  const { Nom_article, Prix, articleId } = req.body;
  try {
    const response = await Article.create({ Nom_article, Prix, articleId });
    return res.status(201).json({ response });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

// Ce route permet de récupérer un article spécifique de la base de données en utilisant l'ID de l'article passé en tant que paramètre
router.get('/:articleId', async function (req, res) {
  const { articleId } = req.params;
  try {
    const article = await Article.findOne({
      where: { id: articleId },
    });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

//Ce route permet de recupérer tous les articles enrengistré dans la BDD

router.get('/', async function (req, res) {
  try {
    const response = await Article.findAll();
    
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

//Ce route permet de mettre à jour les articles dans la BDD
router.put('/:id', async function (req, res) {
  const { Nom_article, Prix } = req.body;
  const id = req.params.id;
  try {
    const response = await Article.update(
      {
        Nom_article: Nom_article,
        Prix: Prix,
      },
      {
        where: { id: id },
      }
    );
    
    //Ce route permet de retourner un msg si la mise à jour des articles n'est pas reussite 
    if (response !== 0) {
      const article = await Article.findOne({
        where: { id: id },
      });
      return res.status(200).json(article);
    } else {
      return res.status(400).json('Ereur');
      
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

//Ce route permet de supprimer l'article en utilisant l'ID de l'article
router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const response = await article.destroy({ where: { id: id } });
    
    if (response !== 0) {
      return res.status(200).json('article supprimé avec succès');
    } else {
      return res.status(404).json('article n a pas été trouvé');
    }
    // Si l'article est trouvé, il est supprimé avec succès sinon un message s'affiche.
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

module.exports = router;
