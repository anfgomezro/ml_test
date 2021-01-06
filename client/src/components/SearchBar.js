import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch('/api/items?q=patineta')
      .then(res => res.json())
      .then(items => this.setState({items: items.items}, () => console.log('Fetched', items)))
      .catch(err => console.log(err));
  }
 
  render () {
    return <div><h1>HOLA MUNDO</h1></div>;
  }
}

export default SearchBar;