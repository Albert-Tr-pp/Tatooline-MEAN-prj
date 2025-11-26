// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlPlanets = require('../controllers/planets');
const ctrlOthers = require('../controllers/others');
const ctrlUsers = require('../controllers/users');

// ----------------------------- GETS -----------------------------
router.get('/', ctrlMain.index);
router.get('/planets', ctrlPlanets.homelist);
router.get('/about', ctrlOthers.about);
router.get('/login', ctrlUsers.login);
router.get('/register', ctrlUsers.register);

// ----------------------------- EXPORTS -----------------------------
module.exports = router;