/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../App.css';
import { PersonaService } from '../PersonaAPI';

function ReturnProduct() {
  const [devolucion, setDevolucion ] = useState([]);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getDevolucion().then(data => {
      setDevolucion(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });
  }, [personaService, setDevolucion]);

  return (
    <div className="inventory">
      <h2>Productos Devueltos</h2>
      {devolucion.length === 0 ? (
        <p>No hay productos devueltos.</p>
      ) : (
        <div className="inventory-list">
          <ul>
          <li className="inventory-header">
            <span>Producto</span>
            <span>Motivo</span>
            <span>Fecha</span>
          </li>
          {devolucion.map((returnedItem) => (
            <li key={returnedItem.id} className="inventory-item">
                <span>{returnedItem.productoId}</span>
                <span>{returnedItem.motivo}</span>
                <span>{returnedItem.fecha}</span>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default ReturnProduct;
