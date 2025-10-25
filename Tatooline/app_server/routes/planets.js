const express = require('express');
const router = express.Router();
const ctrlPlanets = require('../controllers/planets');

router.get('/', ctrlPlanets.homelist);
router.get('/:id', ctrlPlanets.planetDetail);

module.exports = router;
