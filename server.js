const express = require('express');
const superagent = require('superagent');
const { getResults, getProduct } = require('./util');
const port = process.env.PORT || 5000;

const app = express();

app.get('/api/items', async (req,res) => {
  const query = req.query.q;
  if (query) {
    try {
      const response = await superagent.get('https://api.mercadolibre.com/sites/MLA/search').query({ q: query });
      res.json(getResults(response))
    } catch (e) {
      console.log(e);
    }
  } else {
    res.redirect('/');
  }
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = (await superagent.get(`https://api.mercadolibre.com/items/${id}`)).body;
    const productDescription = (await superagent.get(`https://api.mercadolibre.com/items/${id}/description`)).body;
    res.json(getProduct({ ...product, description: productDescription.plain_text }));
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => `Server running in port ${port}`);