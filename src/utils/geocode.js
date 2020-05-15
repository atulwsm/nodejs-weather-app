const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXR1bHNoYXJtYTgwIiwiYSI6ImNrOWZkMHkxazA1NnIzaGtjYWpwdDNmM28ifQ.btZFejRzNmSdGlzsV9oabA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Error occured during interaction with mapbox api service!');
    }
    if (body.features[0] !== undefined) {
      var mapAddress = body.features[0].place_name;
    } else {
      return callback('Address not found. pls try again!');
    }
    let newAddress = address + ',';
    if (
      body.features[0] === undefined ||
      mapAddress.toLowerCase().search(newAddress.toLowerCase()) === -1 ||
      !isNaN(newAddress)
    ) {
      return callback('Address not found. pls try again!');
    } else {
      const data = body.features[0].center;
      const lat = data[1];
      const long = data[0];
      const loc = address;
      const location = body.features[0].place_name;
      const coords = { lat, long, location };
      console.log(coords);
      callback(undefined, coords);
    }
  });
};

module.exports = {
  geocode: geocode,
};
