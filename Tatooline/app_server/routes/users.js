// ----------------------------- REQUIRE -----------------------------
var express = require('express');
var router = express.Router();

// ----------------------------- GETS -----------------------------
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// ----------------------------- EXPORTS -----------------------------
module.exports = router;
