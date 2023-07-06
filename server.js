
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/movies', (req, res) => {
  const movies = JSON.parse(fs.readFileSync('db.json')).movies;
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const movies = JSON.parse(fs.readFileSync('db.json')).movies;
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.post('/movies', (req, res) => {
  const movies = JSON.parse(fs.readFileSync('db.json')).movies;
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  movies.push(newMovie);
  fs.writeFileSync('db.json', JSON.stringify({ movies }));

  res.json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const movies = JSON.parse(fs.readFileSync('db.json')).movies;
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (movie) {
    movie.title = req.body.title;
    movie.description = req.body.description;
    fs.writeFileSync('db.json', JSON.stringify({ movies }));

    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});