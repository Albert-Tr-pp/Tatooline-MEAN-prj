// ----------------------------- REQUIRE -----------------------------
const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlPlanets = require('../controllers/planets');
const ctrlOthers = require('../controllers/others');
const ctrlUsers = require('../controllers/users');

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}

// function requireAuth(req, res, next) {
//   if (req.isAuthenticated && req.isAuthenticated()) return next();
//   return res.redirect('/login');
// }


// ----------------------------- GETS (PAGES) -----------------------------
router.get('/login', ctrlUsers.login);
router.get('/register', ctrlUsers.register);
router.get('/logout', ctrlUsers.logout);

// Защищённые страницы
router.get('/', requireAuth, ctrlMain.index);
router.get('/planets', requireAuth, ctrlPlanets.homelist);
router.get('/about', requireAuth, ctrlOthers.about);

// ----------------------------- POSTS (FORMS -> API) -----------------------------
router.post('/do-login', ctrlUsers.doLogin);
router.post('/do-register', ctrlUsers.doRegister);

module.exports = router;
