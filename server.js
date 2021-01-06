const express = require('express');
const superagent = require('superagent');
const port = process.env.PORT || 5000;

const app = express();

app.get('/api/items', (req,res) => {
  superagent.get('https://api.mercadolibre.com/sites/MLA/search')
    .query({ q: req.query.q })
    .end((err,response) => {
      if (err) res.send('Error');
      const items = response.body.results.slice(0,4);
      res.json({items});
    });
});

app.get('/api/items/:id', (req, res) => {
  res.send('SEGUNDO');
});

app.listen(port, () => `Server running in port ${port}`);