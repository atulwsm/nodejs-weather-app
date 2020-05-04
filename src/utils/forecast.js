const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=7c916bffde176629ea461f88e74bdd2e`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Some error occured!');
    } else {
      const temp = body.current.temp;
      const sky = body.current.weather[0].description;
      const data = { temp, sky };
      callback(undefined, data);
    }
  });
};

module.exports = {
  forecast: forecast,
};
