// ---------- REQUIRE ----------
const request = require('request');

// ----------------------------- apiOptions -----------------------------
// const apiOptions = {
//   server : 'https://localhost:443'
// };
// if (process.env.NODE_ENV === 'production') {
//   apiOptions.server = '';
// }

const apiOptions = {
  server: process.env.API_SERVER || 'http://localhost:8000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = '';
}

// const apiOptions = (req) => process.env.API_SERVER || `${req.protocol}://${req.get('host')}`;

// ---------- RENDER HELPERS ----------
const _renderLogin = (req, res, error) => {
  res.render('login', {
    title: 'Login - Tatooline',
    error: error || null
  });
};

const _renderRegister = (req, res, error) => {
  res.render('register', {
    title: 'Register - Tatooline',
    error: error || null
  });
};

// ---------- GET PAGES ----------
const login = (req, res) => {
  _renderLogin(req, res, req.query.err ? decodeURIComponent(req.query.err) : null);
};

const register = (req, res) => {
  _renderRegister(req, res, req.query.err ? decodeURIComponent(req.query.err) : null);
};

// ---------- POST: REGISTER via API ----------
const doRegister = (req, res) => {
  const path = '/api/register';

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
  };

  request(requestOptions, (err, apiRes, body) => {
    if (err) {
      console.log('API REGISTER ERROR:', err);
      return _renderRegister(req, res, 'API error');
    }

    if (apiRes.statusCode === 201) {
      return res.redirect('/login');
    }

    const msg = body?.message || `Register failed (status ${apiRes.statusCode})`;
    return _renderRegister(req, res, msg);
  });
};

// ---------- POST: LOGIN via API ----------
const doLogin = (req, res) => {

  const path = '/api/login'; //'/api/login-plain' for fake

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    //headers: { cookie: req.headers.cookie || '' },
    json: {
      username: req.body.username,
      password: req.body.password
    }
  };

  request(requestOptions, (err, apiRes, body) => {
    if (err) {
      console.log('API LOGIN ERROR:', err);
      return _renderLogin(req, res, 'API error');
    }

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }

    if (apiRes.statusCode === 200) {
      return res.redirect('/');
    }

    const msg = body?.message || `Login failed (status ${apiRes.statusCode})`;
    return _renderLogin(req, res, msg);
  });
};

// ---------- GET/POST: LOGOUT via API ----------
const logout = (req, res) => {
  const path = '/api/logout';

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    //headers: { cookie: req.headers.cookie || '' },
    json: {}
  };

  request(requestOptions, (err, apiRes, body) => {
    if (err) {
      console.log('API LOGOUT ERROR:', err);
      return res.redirect('/login?err=' + encodeURIComponent('API error'));
    }

    res.clearCookie('connect.sid');

    return res.redirect('/login');
  });
};

module.exports = { login, register, doRegister, doLogin, logout };
