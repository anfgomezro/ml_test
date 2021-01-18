import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import { getPrice, getCondition, getDecimals } from '../util';
import { Helmet } from 'react-helmet';
import '../sass/detail.scss';

export default function DetailProduct() {
  const params = useParams();

  const [data, setData] = useState({
    loading: true,
    item: {}
  });

  useEffect(() => {
    const { id } = params;
    async function getItemData() {
      try {
        const response = await fetch(`/api/items/${id}`);
        const jsonData = await response.json();
        setData({
          loading: false,
          item: jsonData.item,
        });
      } catch (e) {
        console.log(e);
      }
    }
    getItemData();
  }, [params]);

  const { loading, item } = data;

  return (
    <>
      {!loading && <Helmet>
        <meta name="description" content={`Compralo en mercado libre por solo $ ${item.price.amount}`}></meta>
      </Helmet>}
      <section className="item-detail" role="main"> 
      {loading 
        ? <Spinner/>
        : 
        item ? <div className="item-detail-wrapper">
          <div className="item-detail-cl1">
            <div className="item-detail-picture">
              <img src={item.picture} alt={item.title}/>
            </div>
            <div className="item-detail-description">
              <h2>Descripción del producto</h2>
              <p>{item.description}</p>  
            </div>
          </div>
          <aside className="item-detail-cl2">
            <span className="item-detail-condition">{getCondition(item.condition)} | {item.sold_quantity} Vendidos</span>
            <h1 className="item-detail-title">{item.title}</h1>
            <p className="item-detail-price">$ {getPrice(item.price.amount)}<sup>{getDecimals(item.price.decimals)}</sup></p>
            <button className="item-detail-button">Comprar</button>
          </aside>
        </div> : <p>El item no existe</p>
        }
      </section>
    </>
  );
}