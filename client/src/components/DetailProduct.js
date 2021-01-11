import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import { cond } from 'ramda';

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

  const getCondition = (condition) => condition === 'new' ? 'Nuevo' : 'Usado';

  return (
    <section className="container" role="main"> 
    {loading 
      ? <Spinner/>
      : 
      <div className="item-detail">
        <div className="item-detail__cl1">
          <img src={item.picture} alt={item.title}/>
          <div className="item-detail__description">
            <h2>Descripción del producto</h2>
            <p>{item.description}</p>  
          </div>
        </div>
        <aside className="item-detail__cl2">
          <span className="item-detail__condition">{getCondition(item.condition)} | {item.sold_quantity} Vendidos</span>
          <h1 className="item-detail__title">{item.title}</h1>
          <p className="item-detail__price">$ {item.price.amount}</p>
          <button className="item-detail__button">Comprar</button>
        </aside>
      </div>
      }
    </section>
  );
}