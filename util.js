const R = require('ramda');

const transformResults = R.applySpec({
  price: {
    currency: R.prop('currency_id'),
    amount: R.prop('price'),
  }, 
  picture: R.prop('thumbnail'),
  free_shipping: R.path(['shipping', 'free_shipping']),
});

const processResults = R.pipe(
  R.pick(['id', 'title', 'currency_id', 'price', 'thumbnail', 'condition', 'shipping', 'sold_quantity', 'description']),
  R.converge(R.mergeRight, [R.identity, transformResults]),
  R.omit(['currency_id', 'shipping', 'thumbnail'])
);

const getItems = R.pipe(
  R.take(4),
  R.map(processResults),
  R.map(R.omit(['sold_quantity']))
);

const transformResponse = R.applySpec({
  items: R.pipe(
    R.prop('results'),
    getItems,
  )
})

const getResults = R.pipe(
  R.prop('body'),
  R.pick(['results', 'available_filters']),
  transformResponse
);

const getProduct = (data) => ({ item: processResults(data) });

module.exports = {
  getResults,
  getProduct,
};