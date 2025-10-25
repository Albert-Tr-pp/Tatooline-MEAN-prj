// app_server/controllers/about.js
const about = function(req, res) {
    res.render('about', { title: 'About Tatooline' });
};

module.exports = {
about
};