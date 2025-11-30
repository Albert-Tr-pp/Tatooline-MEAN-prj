// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');

// ----------------------------- generalInfoSchema -----------------------------
const   GeneralInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// ----------------------------- planetSchema -----------------------------
const PlanetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String
  // distance, radius, moons...
});

// ----------------------------- EXPORTS -----------------------------
module.exports = mongoose.model('Planet', PlanetSchema);
