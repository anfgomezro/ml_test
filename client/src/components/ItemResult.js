import React from 'react';
import { getPrice } from '../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

export default function ItemResult(props) {
  const { item } = props;

  return (
    <li className="search-result-wrapper">
        <a className="search-result-image" href={`/items/${item.id}`}>
          <img src={item.picture} alt={item.title}/>
        </a>
      <div>
        <div className="search-result-price">
          <div className="search-result-price__amount">$ {getPrice(item.price.amount)}</div>
          { item.free_shipping && <span>
            <FontAwesomeIcon icon={faTruck}/>
          </span>}
        </div>
        <h2 className="search-result-title">
          <a href={`/items/${item.id}`}>{item.title}</a>
        </h2>
      </div>
    </li>
  );
}