const express = require('express');
const path = require('path');
const user = require('./users');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.path} \n`;
  fs.appendFile('server.log', log, err => {
    if (err) throw err;
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    body: 'Some text hbs'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    body: 'Some text hbs'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects'
  });
});

const staticFolder = path.join(__dirname, 'public');

app.use(express.static(staticFolder));

app.get('/api/user', (req, res) => {
  res.json(user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on Port:${PORT}`));
