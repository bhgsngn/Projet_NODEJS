//on recupere tous les models nécessaire
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const db = require('../models/index');

//configuration du model user
const User = db.users;
const Op = db.Sequelize.Op;

//Ce route permet créer un nouveau utilisateur
router.post('/Inscription', async function (req, res) {
  const { usernom, password } = req.body;
  try {
    const response = await User.create({ usernom, password }); 
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

//Quand l'utilisateur se connecte  un jeton est creer  pour lui chaque fois que la demande est reçue
router.post('/Login', async function (req, res) {
  const { usernom, password } = req.body;
  try {
    let token = crypto.randomBytes(48).toString('hex');
    const response = await User.update(
      {
        token: token,
      },
      {
        where: { usernom: usernom, password: password }, 
      }
    );
    console.log(response);

    /*
      Ce code permet de vérifier l'authentification d'un user en comparant le nom d'user 
      et le mot de passe fournis avec ceux stockés dans la base de données. */
    if (response !== 0) {
      const user = await User.findOne({
        where: { usernom: usernom, password: password },
      }); // user returned with authenticated token
      return res.status(200).json(user);
    }
    return res.status(400).json('Usernom ou password est incorrect');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error });
  }
});

  // ce route permet la deconnexion  du système lorsque l'user passe le jeton qui a été généré précédemment
router.post('/Déconnexion', async function (req, res) {
  const { token } = req.body;
  try {
    const response = await User.update(
      {
        token: null,
      },
      {
        where: { token: token },
      }
    ); 
    console.log(response);
    if (response !== 0) {
      return res.status(200).json('La déconnexion de l user a réussi donc le jeton est  détruit');
     
    }
        // si les informations user n'ont pas été fournies, affichage d'un mesage
    return res.status(400).json('Le jeton est incorrect pour la déconnexion de l user');
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: error });
  }
});

module.exports = router;
