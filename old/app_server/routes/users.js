// ----------------------------- REQUIRE -----------------------------
var express = require('express');
var router = express.Router();
const ctrlUsers = require('../controllers/users');

// ----------------------------- GETS -----------------------------
router.get('/login', ctrlUsers.login);
router.get('/register', ctrlUsers.register);

// ----------------------------- EXPORTS -----------------------------
module.exports = router;
