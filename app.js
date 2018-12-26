const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('abrieron la página papá!!!');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({message: "funciona bien y esto es un JSON papá!!!"});
  next();
});

module.exports = app;
