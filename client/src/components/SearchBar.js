import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const SearchBar = () => {

  const [search, setSearch] = useState('');
  const history = useHistory();

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
    console.log('getREsultus call function');
    history.push(`/items?q=${search}`);
  }

  return (
    <header className="search-bar">
      <div className="wrapper">
        <a className="nav-logo" href="/">Mercado Libre Colombia - Donde comprar y vender de todo</a>
        <div className="search-form">
          <input 
            className="search-input"
            type="text"
            placeholder="Nunca dejes de buscar"
            autoFocus
            onChange ={(e) => onChange(e.target.value)}
            onKeyPress={(e) => onKeyPress(e)}/>
            <button className="search-button" onClick={getResults}>
              <i className="fas fa-search"></i>
            </button>
        </div> 
       </div>
    </header>
  );
}

export default SearchBar;