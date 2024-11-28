import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import './App.css';
import { PersonaService } from './PersonaAPI';

function Product() {
  const { products, addProduct, addToCart, setproduct } = useContext(CartContext);
  const [nombre, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [originalPrice, setOriginalPrice] = useState('');
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getProducto().then(data =>  {
      setproduct(data);
      
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setproduct]);
  
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),  // Asigna un ID único al producto
      nombre,
      category,
      price,
      stock,
      image,
      isDiscounted,
      originalPrice,
      addedDate: new Date(),
    };
    addProduct(newProduct);
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setImage('');
    setIsDiscounted(false);
    setOriginalPrice('');
  };

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <input type="text" value={nombre} onChange={(e) => setName(e.target.value)} placeholder="Nombre del producto" required />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoría" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Precio" required />
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="URL de la imagen" required />
        <label>
          <input type="checkbox" checked={isDiscounted} onChange={(e) => setIsDiscounted(e.target.checked)} />
          ¿Producto con descuento?
        </label>
        {isDiscounted && (
          <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Precio original" required />
        )}
        <button type="submit">Agregar Producto</button>
      </form>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.imagen} alt={product.nombre} className="product-image" />
            <h2 color='black'>{product.nombre}</h2>
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
            <p>Categoria:{product.categoria}</p>
            <p>Stock: {product.cantidad}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
