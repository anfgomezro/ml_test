const R = require('ramda');

const calcDecimal = R.pipe(
  R.modulo(R.__,1),
  R.multiply(100),
  Math.round
);

const priceValidation = R.partial(R.ifElse, [R.pipe(R.modulo(R.__,1), R.equals(0))] );

const getAmount = R.pipe(
  R.prop('price'), 
  priceValidation(R.identity, Math.floor),
);

const getDecimal = R.pipe(
  R.prop('price'), 
  priceValidation(R.always(0), calcDecimal),
);

const transformResults = R.applySpec({
  price: {
    currency: R.prop('currency_id'),
    amount: getAmount,
    decimals: getDecimal,
  }, 
  picture: R.prop('thumbnail'),
  free_shipping: R.path(['shipping', 'free_shipping']),
});

const getAuthor = R.pipe(
  R.pick(['first_name', 'last_name', 'nickname']),
  R.applySpec({
    name: R.propOr("", 'first_name'),
    lastname: R.propOr("", 'last_name'),
    nickname: R.propOr("", 'nickname'),
  }),
);

const processResults = R.pipe(
  R.pick(['id', 'title', 'currency_id', 'price', 'thumbnail', 'condition', 'shipping', 'sold_quantity', 'description']),
  R.converge(R.mergeRight, [R.identity, transformResults]),
  R.omit(['currency_id', 'shipping', 'thumbnail'])
);

const getItems = R.pipe(
  R.prop('results'),
  R.take(4),
  R.map(processResults),
  R.map(R.omit(['sold_quantity'])),
);

const getCategories = R.pipe(
  R.prop('available_filters'),
  R.find(R.propEq('id', 'category')),
  R.propOr([], 'values'),
  R.map(R.prop('name')),
);

const transformResponse = R.applySpec({
  categories: getCategories,
  items: getItems,
});

const getResults = R.pipe(
  R.prop('body'),
  R.pick(['results', 'available_filters']),
  transformResponse,
);

const getProduct = R.applySpec({
  item: processResults,
  author: getAuthor,
});

module.exports = {
  getResults,
  getProduct,
};