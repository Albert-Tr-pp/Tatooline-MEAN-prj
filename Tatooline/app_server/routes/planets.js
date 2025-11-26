// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();
const ctrlPlanets = require('../controllers/planets');

// ----------------------------- GETS -----------------------------
router.get('/', ctrlPlanets.homelist);
router.get('/:id', ctrlPlanets.planetDetail);
router.get('/planets', ctrlPlanets.homelist);

// ----------------------------- EXPORTS -----------------------------
module.exports = router;
