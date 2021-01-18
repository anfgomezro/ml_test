import React from 'react';
import '../sass/categories.scss';

export default function Categories(props) {
  const { categories } = props;

  return (
    <div className="categories-wrapper">
      <ul className="categories-list">
        <li className="categories-item">Búsquedas relacionadas</li>
        {categories.slice(0,5).map(item => (<li className="categories-item">{item}</li>))}
      </ul>
    </div>
  );
}