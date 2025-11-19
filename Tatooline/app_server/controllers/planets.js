// require()

// const homelist = (req, res) => {
//   const planets = [
//     {
//       _id: '1',
//       name: 'Mercury',
//       description: 'The smallest planet, closest to the Sun.',
//       image: '/images/mercury.jpg'
//     },
//     {
//       _id: '2',
//       name: 'Venus',
//       description: 'Second planet from the Sun, with a thick atmosphere.',
//       image: '/images/venus.jpg'
//     },
//     {
//       _id: '3',
//       name: 'Earth',
//       description: 'Our home planet, the third from the Sun.',
//       image: '/images/earth.jpg'
//     },
//     {
//       _id: '4',
//       name: 'Mars',
//       description: 'The Red Planet, a possible future home.',
//       image: '/images/mars.jpg'
//     },
//     {
//       _id: '5',
//       name: 'Jupiter',
//       description: 'The largest planet in the Solar System.',
//       image: '/images/jupiter.jpg'
//     },
//     {
//       _id: '6',
//       name: 'Saturn',
//       description: 'Famous for its rings.',
//       image: '/images/saturn.jpg'
//     },
//     {
//       _id: '7',
//       name: 'Uranus',
//       description: 'An ice giant with a unique tilt.',
//       image: '/images/uranus.jpg'
//     },
//     {
//       _id: '8',
//       name: 'Neptune',
//       description: 'The farthest known planet from the Sun.',
//       image: '/images/neptune.jpg'
//     }
//   ];
  

//   res.render('planets', { title: 'Solar System Planets', planets });
// };

// const planetDetail = (req, res) => {
//   const planets = [
//     { _id: '1', name: 'Mercury', description: 'The smallest planet, closest to the Sun.', image: '/images/mercury.jpg' },
//     { _id: '2', name: 'Venus', description: 'Second planet from the Sun, with a thick atmosphere.', image: '/images/venus.jpg' },
//     { _id: '3', name: 'Earth', description: 'Our home planet, the third from the Sun.', image: '/images/earth.jpg' },
//     { _id: '4', name: 'Mars', description: 'The Red Planet, a possible future home.', image: '/images/mars.jpg' },
//     { _id: '5', name: 'Jupiter', description: 'The largest planet in the Solar System.', image: '/images/jupiter.jpg' },
//     { _id: '6', name: 'Saturn', description: 'Famous for its rings.', image: '/images/saturn.jpg' },
//     { _id: '7', name: 'Uranus', description: 'An ice giant with a unique tilt.', image: '/images/uranus.jpg' },
//     { _id: '8', name: 'Neptune', description: 'The farthest known planet from the Sun.', image: '/images/neptune.jpg' }
//   ];

//   const planet = planets.find(p => p._id === req.params.id);
//   if (!planet) {
//     return res.status(404).send('Planet not found');
//   }

//   res.render('planet_detail', { title: planet.name, planet });
// };

// app_server/controllers/planets.js
const mongoose = require('mongoose');
const Planet = mongoose.model('Planet');

// GET /planets (list)
const homelist = async (req, res) => {
  try {
    const planets = await Planet.find({}).lean(); // <- GET DATA FROM MONGODB

    res.render('planets', {
      title: 'Solar System Planets',
      planets
    });
  } catch (err) {
    console.error("Error loading planets:", err);
    res.status(500).send("Database error");
  }
};

// GET /planets/:id (detail)
const planetDetail = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id).lean();

    if (!planet) {
      return res.status(404).send('Planet not found');
    }

    res.render('planet_detail', {
      title: planet.name,
      planet
    });
  } catch (err) {
    console.error("Error loading planet detail:", err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  homelist,
  planetDetail
};