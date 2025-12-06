// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();

const ctrlUsers = require('../controllers/users');
const ctrlPlanets = require('../controllers/planets');

// planets
router
    .route('/planets')
    .get(ctrlPlanets.PlanetsReadAll)
    //.post(ctrlPlanets.planetsCreate);

router
    .route('/planets/:planetid')
    .get(ctrlPlanets.plantsReadOne)
    // .put(ctrlPlanets.planetsUpdateOne)
    // .delete(ctrlPlanets.planetsDeleteOne);

router
    .route('/register')
    .post(ctrlUsers.register);

router
    .route('/login')
    .post(ctrlUsers.login);


module.exports = router;