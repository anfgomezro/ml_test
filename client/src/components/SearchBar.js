import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../sass/search.scss';

const SearchBar = () => {
  
  const history = useHistory();

  const [search, setSearch] = useState('');

  const onChange = (text) => {
    setSearch(text);
  };

  const onKeyPress = (event) => {
    const code = event.keyCode || event.which;
    if(code === 13) {
      getResults();
    } 
  };

  const getResults = () => {
    if (search) history.push(`/items?q=${search}`);
  }

  return (
    <header role="banner" className="search-bar">
      <div className="search-bar-wrapper">
        <a className="search-bar-logo" href="/">Mercado Libre Colombia - Donde comprar y vender de todo</a>
        <div className="search-bar-form">
          <input className="search-bar-input"
            type="text"
            placeholder="Nunca dejes de buscar"
            autoFocus
            onChange ={(e) => onChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}
            aria-label="Search Terms"/>
          <button className="search-bar-button" onClick={getResults} aria-label="search-button">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div> 
       </div>
    </header>
  );
}

export default SearchBar;