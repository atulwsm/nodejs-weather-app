const express = require('express');
const path = require('path');
const hbs = require('hbs');

const request = require('request');
const forecast = require('./utils/forecast.js');
const geo = require('./utils/geocode');
const port = process.env.PORT || 3000;
const app = express();

//tell app/express about which templating engine we have installed
//app.set key value - key: views engine, value: template engine name

const resourcePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// view engine settings
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//hbs partials settings
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(resourcePath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    heading: 'Weather App',
    message: 'Weather forecasting service!',
    name: 'WSM',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    heading: 'About Me',
    message: 'Atul Sharma',
    name: 'WSM',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather Help',
    heading: 'Weather Help',
    helpText: 'Weather forecasting related help',
    name: 'WSM',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  const location = decodeURI(req.query.address);
  console.log(location);

  if (location === undefined || typeof location !== 'string') {
    return console.log('Please enter location');
  }

  geo.geocode(location, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast.forecast(lat, long, (error, { temp, sky }) => {
      if (error) {
        return res.send({ error });
      }
      console.log(location);
      console.log(`${temp} Fahrenheit, and ${sky}`);
      res.send({
        forecast: `${temp} Fahrenheit, and ${sky}`,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.send('404 Page');
});

app.listen(port, () => {
  console.log('Server started!');
});
