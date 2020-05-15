const request = require('request');

const forecast = (lat, long, callback) => {
  let url =
    'https://api.openweathermap.org/data/2.5/onecall?' +
    '&lat=' +
    lat +
    '&lon=' +
    long +
    '&appid=7c916bffde176629ea461f88e74bdd2e' +
    '&units=metric';
  // let url =
  //   'https://api.openweathermap.org/data/2.5/weather?' +
  //   '&lat=' +
  //   lat +
  //   '&lon=' +
  //   long +
  //   '&appid=7c916bffde176629ea461f88e74bdd2e' +
  //   '&units=metric' +
  //   '&lang=en';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Some error occured!', undefined);
    } else {
      console.log(body);
      const temp = body.current.temp;
      const humidity = body.current.humidity;
      const wind_speed = body.current.wind_speed;
      const sky = body.current.weather[0].description;
      const icon = body.current.weather[0].icon;
      const data = { temp, sky, icon, humidity, wind_speed };
      callback(undefined, data);
    }
  });
};

module.exports = {
  forecast: forecast,
};
