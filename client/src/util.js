const getCondition = (condition) => condition === 'new' ? 'Nuevo' : 'Usado';

const getPrice = (price) => {
  if(price >= 1000) {
    const finalPrice = Array.from(price.toString());
    finalPrice.splice(-3, 0, '.');
    return finalPrice.join('');
  }
  return price;
};

const getDecimals = (decimals) => decimals === 0 ? '00' : decimals;

export {
  getCondition,
  getPrice,
  getDecimals
}
