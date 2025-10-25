const express = require('express');
const router = express.Router();

const ctrlAbout = require('../controllers/about');

const ctrlMain = require('../controllers/main');
const ctrlPlanets = require('../controllers/planets');
const ctrlOthers = require('../controllers/others');

router.get('/about', ctrlAbout.about);

router.get('/', ctrlMain.index);

router.get('/planets', ctrlPlanets.homelist);


module.exports = router;