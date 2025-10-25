const index = function(req, res){
    res.render('index', { 
        title: 'Tatooline',
        content: 'Tatooline - A web application that allows users to explore various space objects such as planets, satellites, asteroids, stars, etc. The aim of the project is to popularise space topics among people. Users will be able to receive new reports and images every day. Learn about new space objects. Each object will be assigned a unique page displaying data and images. Additional educational features will also be available, such as: Space Gallery, Asteroid Tracking, NASA Satellites Tracker and other features'
    });
};

module.exports.about = function (req, res) {
  res.render('about', { title: 'About Space Explorer' });
};
// , bodyClass: 'd-flex h-100 text-center text-bg-dark'

