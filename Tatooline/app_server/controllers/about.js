// ----------------------------- ABOUT -----------------------------
const about = function(req, res) {
    res.render('about', { title: 'About Tatooline' });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = {
about
};