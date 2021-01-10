import React from 'react';

const AppContext = React.createContext({
  search: () => {},
  items: [],
});

export default AppContext;