// ----------------------------- INDEX -----------------------------
const index = function(req, res){
res.render('index', { title: 'Tatooline' });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = {
index
};