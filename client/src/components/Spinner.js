import React from 'react';
import spinner from '../img/spinner.gif';
import '../sass/spinner.scss';

export default function Spinner() {
  return <img src={spinner} alt="" className="spinner"/>;
}