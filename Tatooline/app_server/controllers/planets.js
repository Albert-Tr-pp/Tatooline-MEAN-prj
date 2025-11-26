// const mongoose = require('mongoose');
// const Planet = mongoose.model('Planet');

// ----------------------------- REQUIRE -----------------------------
const request = require('request');

// ----------------------------- apiOptions -----------------------------
const apiOptions = {
server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
apiOptions.server = '';
}

// ----------------------------- homelist -----------------------------
const homelist = function(req, res) {
  const path = '/api/planets';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log("API ERROR:", err);
      return res.render('error', { message: 'API error', error: err });
    } else if (response.statusCode !== 200) {
      return res.render('error', {
        message: `Unexpected status: ${response.statusCode}`,
        error: body
      });
    }

    _renderPlanetList(req, res, body);
  });
};

const _renderPlanetList = function(req, res, apiData) {
  res.render('planets', {
    title: "Planets",
    planets: apiData
  });
};

// ----------------------------- planetDetail -----------------------------
const planetDetail = function(req, res) {
  const path = `/api/planets/${req.params.id}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log("API ERROR:", err);
      return res.render('error', { message: 'API error', error: err });
    } else if (response.statusCode !== 200) {
      return res.render('error', {
        message: `Unexpected status: ${response.statusCode}`,
        error: body
      });
    }

    _renderPlanetDetail(req, res, body);
  });
};


const _renderPlanetDetail = function(req, res, planetData) {
  res.render('planet_detail', {
    title: planetData.name,
    planet: planetData
  });
};

// ----------------------------- EXPORTS -----------------------------
module.exports = {
  homelist,
  planetDetail
};