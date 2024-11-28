/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './App.css';
import { PersonaService } from './PersonaAPI';

function ProductDetail() {
  const { products, addToCart, setproduct } = useContext(CartContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getInfoProduct(id).then(data =>  {
      setproduct(data);      
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [id, personaService, setproduct]);

  const product = products;

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    const productToAdd = { ...product, selectedSize, quantity };
    addToCart(productToAdd);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="product-detail">
      <div className="product-detail-image-container">
        <img src={products.imagen} alt={products.nombre} className="product-detail-image" />
      </div>
      <div className="product-detail-info">
        <h2>{product.nombre}</h2>
        <p>
          {product.isDiscounted ? (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discounted-price">${products.precio}</span>
            </>
          ) : (
            `$${products.precio}`
          )}
        </p>
        <p>{products.categoria}</p>
        <div className="product-options">
          <label>
            <span>Select size:</span>
            <div className="sizes">
              <button className={`size-button ${selectedSize === 'XS' ? 'selected' : ''}`} onClick={() => setSelectedSize('XS')}>XS</button>
              <button className={`size-button ${selectedSize === 'S' ? 'selected' : ''}`} onClick={() => setSelectedSize('S')}>S</button>
              <button className={`size-button ${selectedSize === 'M' ? 'selected' : ''}`} onClick={() => setSelectedSize('M')}>M</button>
              <button className={`size-button ${selectedSize === 'L' ? 'selected' : ''}`} onClick={() => setSelectedSize('L')}>L</button>
              <button className={`size-button ${selectedSize === 'XL' ? 'selected' : ''}`} onClick={() => setSelectedSize('XL')}>XL</button>
            </div>
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="quantity-input"
            />
          </label>
        </div>
        <div className="product-detail-buttons">
          <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al carrito</button>
          <button onClick={handleGoToCart} className="go-to-cart-button">Ir al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
