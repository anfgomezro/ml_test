import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ItemResult } from './ItemResult';

export default function Results() {

  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('q');
    fetch(`/api/items?q=${search}`)
      .then(res => res.json())
      .then(items => setResults(items.items))
      .catch(err => console.log(err));
  }, [location]);

  return (
    <div>
      {results.map(item => <ItemResult item={item}/>)}
    </div>
  );
}