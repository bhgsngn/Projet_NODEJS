/////on recupere tous les models nécessaires
const express = require('express');
const router = express.Router();
const db = require('../models/index');

//configuration du model commande
const Commande = db.commandes;
const Op = db.Sequelize.Op;

// création d'une commande basée sur la demande de l'utilisateur.
router.post('/', async function (req, res) {
  const { id_commande, Date_commande, commandepar } = req.body;
  try {
    const response = await Commande.create({ id_commande, Date_commande, commandepar }); 
    return res.status(201).json({ response });
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

// obtenir une commande spécifique basée sur l'id d'entrée de la commande
router.get('/:commandeId', async function (req, res) {
  const { commandeId } = req.params;
  try {
    const commande = await Commande.findOne({
      where: { id: commandeId },
    });
  
    return res.status(200).json(commande);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

// obtenir toute les commandes et les afficher
router.get('/', async function (req, res) {
  try {
    const response = await Commande.findAll();
   
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});
// mise à jour des commandes en fonction de l'identifiant entré par l'utilisateur. Exp: mettre à jour id commande et datecommande, etc.
router.put('/:id', async function (req, res) {
  const { id_commande, Date_commande, commandepar } = req.body;
  const id = req.params.id;
  try {
    const response = await Commande.update(
      {
        id_commande: id_commande,
        Date_commande: Date_commande,
        commandepar: commandepar,
      },
      {
        where: { id: id },
      }
    );
  // renvoie la réponse si la mise à jour de la commande n'a pas réussi
    if (response !== 0) {
      const commande = await Commande.findOne({
        where: { id: id },
      });
      return res.status(200).json(commande);
    } else {
      return res.status(400).json('Action non abbouti');
      
    }
  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});
// suppression de la commande en fonction de la demande de l'utilisateur.
router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const response = await Commande.destroy({ where: { id: id } });
   
    if (response !== 0) {
      return res.status(200).json('commande supprimé');
    } else {
      return res.status(404).json('commande non trouvé');
    }

  } catch (error) {
    return res.status(500).json({ Error: error });
  }
});

module.exports = router;
