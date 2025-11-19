//require('./planets');
const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
  // distance, radius, moons...
});

module.exports = mongoose.model('Planet', planetSchema);
