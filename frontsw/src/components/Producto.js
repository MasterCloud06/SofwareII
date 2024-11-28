// src/components/Producto.js
import React, {useContext} from 'react';
import '../App.css';
import { CartContext } from '../CartContext';
import Feedback from './Feedback';

const Producto = ({ producto }) => {
    const { addToCart} = useContext(CartContext);
    return (
        <div className="product-list">
            <h3>Resultado:</h3>
            <div className="product">
            <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            <h2 color='black'>{producto.nombre}</h2>
            <p>Precio: ${producto.precio}</p>
            <p>Categoria:{producto.categoria}</p>
            <p>Stock: {producto.cantidad}</p>
            <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
            <Feedback productId={producto.id} />
          </div>
        </div>
    );
};

export default Producto;
