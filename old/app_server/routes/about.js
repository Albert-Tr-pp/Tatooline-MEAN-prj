// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();

const ctrlAbout = require('../controllers/about');
const ctrlMain = require('../controllers/main');
const ctrlPlanets = require('../controllers/planets');
const ctrlOthers = require('../controllers/others');

// ----------------------------- GETS -----------------------------
router.get('/about', ctrlAbout.about);
router.get('/', ctrlMain.index);
router.get('/planets', ctrlPlanets.homelist);

// ----------------------------- EXPORTS -----------------------------
module.exports = router;