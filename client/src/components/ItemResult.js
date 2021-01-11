import React from 'react';

export default function ItemResult(props) {
  const item = props.item;
  const getPrice = (price) => {
    const roundPrice = Math.ceil(price);
    if(roundPrice >= 1000) {
      const finalPrice = Array.from(roundPrice.toString());
      finalPrice.splice(-3, 0, '.');
      return finalPrice.join('');
    }
    return roundPrice;
  };

  return (
    <li className="item-wrapper">
        <a className="item-image" href={`/items/${item.id}`}>
          <img src={item.picture} alt={item.title}/>
        </a>
      <div>
        <div className="item-price">
          <div className="item-price__amount">$ {getPrice(item.price.amount)}</div>
          <span><i className="fas fa-truck"></i></span>
        </div>
        <h2>{item.title}</h2>
      </div>
    </li>
  );
}