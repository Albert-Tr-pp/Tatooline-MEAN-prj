const index = function(req, res){
res.render('index', { title: 'Tatooline' });
};
module.exports = {
index
};