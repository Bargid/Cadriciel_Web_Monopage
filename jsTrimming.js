// ========== FETCH L'INFO DE TOUS LES LIVRES ==========

app.get('/books', function (req, res) {
    const url = 'https://the-one-api.dev/v2/book';

    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request',
            'Authorization': 'Bearer ' + API_KEY
        }
    }, (err, response, data) => {
        if (err) {
            console.log('Error:', err);
            res.status(500).send('Internal Server Error');
        } else if (response.statusCode !== 200) {
            console.log('Status:', response.statusCode);
            res.status(response.statusCode).send(response.statusMessage);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

// ========== FETCH L'INFO DE TOUS LES FILMS ===========

app.get('/movie', function(req, res) {
    const url = 'https://the-one-api.dev/v2/movie';
  
    request.get({
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Bearer ' + API_KEY
      }
    }, (err, response, data) => {
      console.log(data);
      if (err) {
        console.log('Error:', err);
        res.status(500).send('Internal Server Error');
      } else if (response.statusCode !== 200) {
        console.log('Status:', response.statusCode);
        res.status(404).send('Movies Not Found');
      } else {
        console.log(data);
        res.send(data);
      }
    });
  });

// ========== FETCH L'INFO DES FILMS PAR ID ==========

app.get('/movie/:id', function(req, res) {
    const movieId = req.params.id;
    console.log(movieId);
    const url = 'https://the-one-api.dev/v2/movie/' + movieId;
  
    request.get({
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Bearer ' + API_KEY
      }
    }, (err, response, data) => {
      console.log(data);
      if (err) {
        console.log('Error:', err);
        res.status(500).send('Internal Server Error');
      } else if (response.statusCode !== 200) {
        console.log('Status:', response.statusCode);
        res.status(404).send('Movie Not Found');
      } else {
        console.log(data);
        const newData = JSON.stringify(data);
        fs.writeFile('movie-' + movieId + '.json', newData, (err) => {
          if (err) {
            console.log('Error:', err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(data);
            console.log('Success!');
            res.send(data);
          }
        });
      }
    });
  });

app.use("/static", express.static(path.resolve("frontend", "static"))) // Pour accéder au CSS

app.get("/*", (req, res) => {
    res.sendFile(path.resolve('frontend', 'index.html')) // dossier frontend et file index.html
})