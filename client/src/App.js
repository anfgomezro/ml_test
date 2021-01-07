import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Results from './components/Results';
import SearchBar from './components/SearchBar';
import DetailProduct from './components/DetailProduct';
import './App.scss';

export default function App() {
 return (
   <BrowserRouter>
    <Switch>
    <Route path="/items/:id">
        <DetailProduct/>
      </Route>
      <Route path="/items">
        <Results/>
      </Route>
      <Route path="/">
        <SearchBar/>
      </Route>
    </Switch>
   </BrowserRouter>
 );
}