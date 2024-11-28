import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import Product from './Product';
import './App.css';

function SearchResults() {
  const { searchResults } = useContext(CartContext);

  return (
    <div className="search-results">
      {searchResults.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        searchResults.map(product => (
          <Product key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default SearchResults;
