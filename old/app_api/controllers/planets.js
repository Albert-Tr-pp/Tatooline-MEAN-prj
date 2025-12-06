// ----------------------------- REQUIRE -----------------------------
const mongoose = require('mongoose');
const Planet = require('../models/planets');

// ----------------------------- METHODS -----------------------------
const plantsCreate = function (req, res) { };

// ----------------------------- PlanetsReadAll -----------------------------
const PlanetsReadAll = function (req, res) { 
    Planet
    .find()
    .then((planets) => {
    if (planets.length === 0) {
    return res.status(404).json({ message: "No planets found" });
    }
    res.status(200).json(planets);
    })
    .catch((err) => {
    res.status(500).json({ error: err.message });
    });
};

// ----------------------------- plantsReadOne -----------------------------
const plantsReadOne = function (req, res) {
    if (req.params && req.params.planetid) {
    Planet
    .findById(req.params.planetid)
    .then(planet => {
    if (!planet) {
    return res
    .status(404)
    .json({ message: "planetID not found" });
    }
    res
    .status(200)
    .json(planet);
    })
    .catch(err => {
    console.log("❌ ERROR:", err);
    res
    .status(500)
    .json({ message: "Error retrieving planet", error: err });
    });
    } else {
    res
    .status(400)
    .json({ message: "No planetID in request" });
    }
};

const plantsUpdateOne = function (req, res) { };

const plantsDeleteOne = function (req, res) { };

// ----------------------------- EXPORTS -----------------------------
module.exports = {
PlanetsReadAll,
plantsCreate,
plantsReadOne,
plantsUpdateOne,
plantsDeleteOne
};