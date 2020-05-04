const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXR1bHNoYXJtYTgwIiwiYSI6ImNrOWZkMHkxazA1NnIzaGtjYWpwdDNmM28ifQ.btZFejRzNmSdGlzsV9oabA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Error occured during interaction with mapbox api service!');
    }

    console.log(body.features[0] === undefined);

    if (body.features[0] === undefined) {
      callback('Address not found. pls try again!');
    } else {
      const data = body.features[0].center;
      const lat = data[1];
      const long = data[0];
      const location = body.features[0].place_name;
      const coords = { lat, long, location };
      callback(undefined, coords);
    }
  });
};

module.exports = {
  geocode: geocode,
};
