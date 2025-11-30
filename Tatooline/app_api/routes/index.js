// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();

const ctrlUsers = require('../controllers/users');
const ctrlPlanets = require('../controllers/planets');

//PLANETS
router
    .route('/planets')
    .get(ctrlPlanets.PlanetsReadAll)
    //.post(ctrlPlanets.planetsCreate);

router
    .route('/planets/:planetid')
    .get(ctrlPlanets.plantsReadOne)
    // .put(ctrlPlanets.planetsUpdateOne)
    // .delete(ctrlPlanets.planetsDeleteOne);

//USERS
router
    .route('/register')
    .post(ctrlUsers.register);

router
    .route('/login')
    .post(ctrlUsers.login);

router
    .route('/login-plain')
    .post(ctrlUsers.loginPlain);

// router.get('/logout', (req, res, next) => {
//   req.session.destroy();
//   res.redirect('/login');
// });

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    return res.status(200).json({ status: 'success', action: 'logout' });
  });
});


router.get('/session-test', (req, res) => {
  req.session.test = (req.session.test || 0) + 1;
  res.json({ sessionID: req.sessionID, test: req.session.test });
});



module.exports = router;