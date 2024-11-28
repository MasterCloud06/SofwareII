/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import './Admin.css';
import { PersonaService } from '../PersonaAPI';

function Inventory() {
  const { products, deleteProduct, setproduct } = useContext(CartContext);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getProducto().then(data =>  {
      setproduct(data);
      
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }, [personaService, setproduct]);

  return (
    <div className="inventory">
      <h2>Inventario</h2>
      <div className="inventory-list">
        <ul>
          <li className="inventory-header">
            <span>Imagen</span>
            <span>Nombre</span>
            <span>Categoría</span>
            <span>Stock</span>
            <span>Fecha de Agregado</span>
            <span>Opción</span>
          </li>
          {products.map((product) => (
            <li key={product.id} className="inventory-item">
              <span><img src={product.imagen} alt={product.nombre} className="product-image" /></span>
              <span>{product.nombre}</span>
              <span>{product.categoria}</span>
              <span>{product.cantidad}</span>
              <span>{new Date(product.fecha).toLocaleDateString()}</span>
              <span><button onClick={() => deleteProduct(product.id)} className="btn-delete">Eliminar</button></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inventory;

