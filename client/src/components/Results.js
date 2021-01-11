import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemResult from './ItemResult';
import Spinner from './Spinner';

export default function Results() {

  const location = useLocation();
  const [results, setResults] = useState({
    loading: true,
    items: [],
  });

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('q');
    async function fetchResults() {
      try {
        const response = await fetch(`/api/items?q=${search}`);
        const jsonData = await response.json();
        setResults({
          loading: false,
          items: jsonData.items,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchResults();
  }, [location]);

  const { loading, items } = results;

  return (
    <section className="container" role="main">
      {loading 
        ? <Spinner/>
        : 
        <ol>
          {items.map(item => <ItemResult item={item} key={item.id}/>)}
        </ol>
      }
    </section>
  );
}