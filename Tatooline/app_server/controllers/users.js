// ----------------------------- LOGIN -----------------------------
const login = function(req, res) {
    res.render('login', { title: 'Login - Tatooline' });
};

// ----------------------------- REGISTER -----------------------------
const register = function(req, res) {
    res.render('register', { title: 'Register - Tatooline' });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = {
login,
register
};