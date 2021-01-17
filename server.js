const express = require('express');
const superagent = require('superagent');
const { getResults, getProduct } = require('./util');
const port = process.env.PORT || 5000;

const app = express();

app.get('/api/items', async (req,res) => {
  const query = req.query.q;
  try {
    const response = await superagent.get('https://api.mercadolibre.com/sites/MLA/search').query({ q: query });
    res.json(getResults(response))
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: 'Results not found',
    });
  }
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = (await superagent.get(`https://api.mercadolibre.com/items/${id}`)).body;
    const productDescription = (await superagent.get(`https://api.mercadolibre.com/items/${id}/description`)).body;
    const author = (await superagent.get(`https://api.mercadolibre.com/users/${product.seller_id}`)).body;
    res.json(getProduct({ ...product, ...author, description: productDescription.plain_text }));
  } catch (e) {
    console.log(e.status);
    res.status(e.status).json({
      status: e.status,
      message: 'Results not found',
    });
  }
});

app.listen(port, () => `Server running in port ${port}`);