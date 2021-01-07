import React, { useState } from 'react';

const SearchBar = () => {

  const [search, setSearch] = useState('');

  const onChange = (text) => {
    setSearch(text);
  };

  const onKeyPress = (event) => {
    const code = event.keyCode || event.which;
    if(code === 13) {
      console.log('hola enter');
    } 
  };

  const getResults = () => {
    console.log('soy el metodo magico');
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