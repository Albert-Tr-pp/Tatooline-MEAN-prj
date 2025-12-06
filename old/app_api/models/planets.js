// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');

// ----------------------------- generalInfoSchema -----------------------------
const generalInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// ----------------------------- planetSchema -----------------------------
const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
  // distance, radius, moons...
});

// ----------------------------- EXPORTS -----------------------------
module.exports = mongoose.model('Planet', planetSchema);
