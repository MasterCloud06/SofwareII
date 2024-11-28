/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './App.css';
import { PersonaService } from './PersonaAPI';

function ProductList() {
  const { products, addToCart, setproduct } = useContext(CartContext);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getProducto().then(data =>  {
      setproduct(data);
      
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setproduct]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <Link to={`/product/${product.id}`}>
            <img src={product.imagen} alt={product.nombre} className="product-image" />
          </Link>
          <h2>{product.nombre}</h2>
          <p>
            {product.isDiscounted ? (
              <>
                <span className="original-price">${product.originalPrice}</span>
                <span className="discounted-price">${product.precio}</span>
              </>
            ) : (
              `$${product.precio}`
            )}
          </p>
          <p>{product.descripcion}</p>
          <p>{product.categoria}</p>
          <p>Stock: {product.cantidad}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
