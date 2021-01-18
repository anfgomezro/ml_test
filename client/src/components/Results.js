import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ItemResult from './ItemResult';
import Spinner from './Spinner';
import Categories from './Categories';
import '../sass/results.scss';

export default function Results() {
  const location = useLocation();
  
  const [results, setResults] = useState({
    loading: true,
    items: [],
    categories: [],
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
          categories: jsonData.categories,
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchResults();
  }, [location]);

  const { loading, items, categories } = results;

  return (
    <>
      <Helmet>
        <meta name="description" content={`Encuentra mas contenido de ${new URLSearchParams(location.search).get('q')} en Mercado Libre`}></meta>
      </Helmet>
      <section className="search-result" role="main">
        {loading 
          ? <Spinner/>
          :
          <div>
            <Categories categories={categories}/> 
            <ol className="search-result-card">
              {items.map(item => <ItemResult item={item} key={item.id}/>)}
            </ol>
          </div>
        }
      </section>
    </>
  );
}