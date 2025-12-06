// ----------------------------- REQUIRE -----------------------------
const passport = require('passport');
const User = require('../models/users');

// ----------------------------- REGISTER -----------------------------
// const register = (req, res, next) => {
//   const { username, email, password } = req.body;

//   console.log('REGISTER HIT', req.body);
//   res.on('finish', () => console.log('REGISTER FINISHED', res.statusCode));


//   if (!username || !email || !password) {
//     return res.status(400).json({ message: 'username, email, password are required' });
//   }

//   User.register(new User({ username, email }), password, (err, user) => {
//     if (err) return res.status(400).json({ message: err.message });

//     // Вариант 1 (рекомендую для Postman): НЕ логинить сразу, просто ответить
//     return res.status(201).json({
//       status: 'success',
//       action: 'register',
//       user: { id: user._id, username: user.username, email: user.email }
//     });
//   });
// };


const register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('REGISTER HIT', req.body);
  res.on('finish', () => console.log('REGISTER FINISHED', res.statusCode));

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email, password are required' });
  }

  try {
    const user = await User.register(new User({ username, email }), password);

    return res.status(201).json({
      status: 'success',
      action: 'register',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {

    if (err && err.name === 'UserExistsError') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    return res.status(400).json({ message: err.message || 'Registration failed' });
  }
};

// ----------------------------- LOGIN -----------------------------
// const login = (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ message: 'Invalid username or password' });

//     req.login(user, (err2) => {
//       if (err2) return next(err2);
//       return res.status(200).json({
//         status: 'success',
//         action: 'login',
//         user: { id: user._id, username: user.username, email: user.email }
//       });
//     });
//   })(req, res, next);
// };

const login = (req, res, next) => {
  const { username, password } = req.body;
  console.log('[API LOGIN] start', req.body);
  res.on('finish', () => console.log('[API LOGIN] finished', res.statusCode));

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  User.authenticate()(username, password, (err, user, info) => {
    console.log('[API LOGIN] authenticate cb', { err: err?.message, hasUser: !!user, info });

    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Invalid username or password' });

    req.session.regenerate((e1) => {
      if (e1) return next(e1);

      req.session.userId = user._id.toString();
      req.session.username = user.username;

      req.session.save((e2) => {
        if (e2) return next(e2);

        return res.status(200).json({
          status: 'success',
          action: 'login',
          user: { id: user._id, username: user.username, email: user.email }
        });
      });
    });
  });
};

const loginPlain = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }

  try {
    const doc = await User.collection.findOne({ username });

    if (!doc || doc.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    //CREATE LOGGIN
    req.session.userId = doc._id.toString();
    req.session.username = doc.username;

    //SAVE SESSION
    req.session.save((err) => {
      if (err) return next(err);
      return res.status(200).json({
        status: 'success',
        action: 'loginPlain',
        user: { id: doc._id, username: doc.username }
      });
    });
  } catch (e) {
    next(e);
  }
};

// ----------------------------- EXPORT -----------------------------
module.exports = { register, login, loginPlain };