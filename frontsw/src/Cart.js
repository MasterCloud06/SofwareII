import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { PersonaService } from './PersonaAPI';


function Cart() {
  const { cart, removeFromCart, setproduct } = useContext(CartContext);
  const navigate = useNavigate();
  const personaService = new PersonaService();

  useEffect(() => {
    const fetchProductsDetails = async () => {
      try {
        // Obtener todos los productos del contexto o API
        const products = await personaService.getProducto();

        // Asignar los detalles del producto a cada elemento del carrito
        const updatedCart = cart.map(item => {
          const productDetails = products.find(product => product.id === item.productId);
          return {
            ...item,
            name: productDetails ? productDetails.nombre : 'Nombre no disponible',
            image: productDetails ? productDetails.imagen : 'URL de imagen no disponible',
            price: productDetails ? productDetails.precio : 0
          };
        });
        // Actualizar el carrito con los detalles del producto
        setproduct(updatedCart);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsDetails();
  }, [cart, personaService, setproduct]);

  const total = cart.reduce((accumulator, item) => {
    return accumulator + (item.precio * 1);
  }, 0);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.cartItemId} className="cart-item">
              <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
              <div className="cart-item-details">
                <p><strong>Nombre:</strong> {item.nombre}</p>
                <p><strong>Precio:</strong> ${item.precio}</p>
                <button onClick={() => removeFromCart(item.cartItemId)} className="btn-delete">Eliminar</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button className="btn-proceed" onClick={handleProceedToCheckout}>Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
