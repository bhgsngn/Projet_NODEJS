/////on recupere tous les models nécessaires
const express = require('express');
const router = express.Router();
const db = require('../models/index');

//configuration du model commande
const Contrat = db.contrats;
const Op = db.Sequelize.Op;

//Ce permet d'ajouter ,verifier et enrengistrer une contrat
router.post('/add', (req, res) => {
  const contrat = req.body;
  if (!contrat.num || !contrat.description) {
    return res.status(400).json({ message: 'contrat invalid' });
  }
  Contrat.create(contrat)
    .then(createdContrat => {
      res.json(createdContrat);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error d enrengistrement' });
    });
});

// ce code permet de supprimer le  contrat
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Contrat.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'contrat supprimé' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Erreur de supprision' });
    });
});

// Ce code permet de mise à jour le contrat
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedContrat = req.body;
  if (!updatedContrat.num || !updatedContrat.description) {
    return res.status(400).json({ message: 'Action non aboutit' });
  }

  Contrat.findByIdAndUpdate(id, updatedContrat, { new: true })
    .then(contrat => {
      res.json(contrat);
    })
    .catch(err => {
      res.status(500).json({ message: 'Erreur de mise a jour ' });
    });
});




module.exports = router;
