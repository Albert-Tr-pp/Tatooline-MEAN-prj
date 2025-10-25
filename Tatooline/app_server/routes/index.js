const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlPlanets = require('../controllers/planets');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlMain.index);

router.get('/planets', ctrlPlanets.homelist);

router.get('/about', ctrlOthers.about);

module.exports = router;